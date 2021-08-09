import React from 'react';
import { useRouter } from "next/router";
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../../src/components/MainGrid'
import ProfileSidebar from '../../src/components/ProfileSidebar'
import Box from '../../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../../src/lib/AlurakutCommons';
import ProfileRelationsBox from "../../src/components/ProfileRelationsBox";
import ProfileBio from "../../src/components/ProfileBio";
import GitHubService from "../../src/api/githubService";
import DatoCMSService from "../../src/api/datocmsService";
import ScrapsBox from "../../src/components/boxRecados";
import ScrapsList from "../../src/components/listaRecados";
import BoxLink from "../../src/components/boxLink";


export default function ProfilePage() {
  const router = useRouter();
  const { user } = router.query;
  const githubUser = user;
  const [username, setUsername] = React.useState([]);
  const [comunidades, setComunidades] = React.useState([]);
  const [seguidores, setSeguidores] = React.useState([]);
  const [seguindo, setSeguindo] = React.useState([]);
  const [scraps, setScraps] = React.useState([]);
  
  
  React.useEffect(function() {
    // GET
    GitHubService.getUsername(githubUser).then((data) => {
      const loggedUsername = data;
      setUsername(loggedUsername);
    });

    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((response) => response.json())
      .then(function (finalResult) {
        const seguidoresMap = finalResult.map(({ id, login, avatar_url }) => ({
          id: id,
          title: login,
          imageUrl: avatar_url,
          category: "https://github.com/",
          
        }));
        return setSeguidores(seguidoresMap);
      });

    fetch(`https://api.github.com/users/${githubUser}/following`)
      .then((response) => response.json())
      .then(function (finalResult) {
        const seguindoMap = finalResult.map(({ id, login, avatar_url }) => ({
          id: id,
          title: login,
          imageUrl: avatar_url,
          category: "https://github.com/",

        }));
        return setSeguindo(seguindoMap);
      });  
     
    // API GraphQL comunidades
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '2a263ac93eb257022d2a57d176bdb4',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id 
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json()) 
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      setComunidades(comunidadesVindasDoDato)
    })

     // API GraphQL Recados
    DatoCMSService.getScraps().then((data) => {
      const allScraps = data.data.allRecados;
      setScraps(allScraps);
    });

  }, []);


  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
          <ProfileBio
              boxTitle={`Bem-vindo(a), ${username.name}`}
              bio={username.bio}
              local={username.location}
            />

            <OrkutNostalgicIconSet 
               seguidores={seguidores.length}
               seguindo={seguindo.length}
               comunidades={comunidades.length}
               recados={scraps.length}
               confiavel="3"
               legal="3"
               sexy="3"
             />

          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                console.log('Campo: ', dadosDoForm.get('title'));
                console.log('Campo: ', dadosDoForm.get('image'));

                const comunidade = {
                  title: dadosDoForm.get('title'),
                  imageUrl: dadosDoForm.get('image'),
                  creatorSlug: githubUser,
                }

                fetch('/api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(comunidade)
                })
                .then(async (response) => {
                  const dados = await response.json();
                  console.log(dados.registroCriado);
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas)
                })
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                  />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>

          <Box>
            <h2 className="subTitle">Deixar um recado</h2>
            <form onSubmit={function handleCreateScrap(e) {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                const scrap = {
                  text: dadosDoForm.get("text"),
                  creatorSlug: githubUser,
                };

                fetch('/api/recados', {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(scrap),
                })
                .then(async (response) => {
                  const dados = await response.json();
                  const scrap = dados.registroCriado;
                  const scrapsAtualizados = [...scraps, scrap];
                  setScraps(scrapsAtualizados);
                    
                });
              }}>
                <div>
                  <textarea
                    placeholder="Deixe seu recado"
                    name="text"
                    aria-label="Deixe seu recado"
                    type="text"
                  />
                </div>
                <button>Enviar recado</button>
              </form>

          </Box>
          <ScrapsBox>
            <ScrapsList
              boxTitle={"Recados"}
              scraps={scraps}
              name={username.login}
              image={username.avatar_url}
            />
            <BoxLink url={`/recados`} linkTitlte={"Ver todos"} />
          </ScrapsBox>
        </div>

        <div 
          className="profileRelationsArea" 
          style={{ gridArea: 'profileRelationsArea' }}>

            <ProfileRelationsBox title="Meus Seguidores" section={seguidores} caminho="/seguidores"/>
            <ProfileRelationsBox title="Seguindo" section={seguindo} caminho="/seguindo"/>
            
            <ProfileRelationsBox title="Comunidades" section={comunidades} caminho="/comunidades"/>
            
        </div>
      </MainGrid>
    </>
  )
}


export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  })
  .then((resposta) => resposta.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {}, 
  }
}



