import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGridOpcao from '../src/components/MainGrid/opcao'
import ProfileSidebar from '../src/components/ProfileSidebar'
import { AlurakutMenu,} from '../src/lib/AlurakutCommons';
import BoxOpcao from '../src/components/Box/opcao';
import Box from '../src/components/Box'
import ProfileRelationsBoxLink from '../src/components/ProfileRelationsBox/profileLinkComunidade';

export default function comunidades(props) {
  const usuarioAleatorio = props.githubUser;
  const [comunidades, setComunidades] = React.useState([]);

  React.useEffect(function() {
    // GET
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
          link
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json()) 
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      setComunidades(comunidadesVindasDoDato)
    })

  }, [])


  return (
    <>
      <AlurakutMenu githubUser={usuarioAleatorio} />
      <MainGridOpcao>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}> 
          <ProfileSidebar  githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <BoxOpcao>
            <h1 className="title">
              Comunidades 
            </h1>
            <ProfileRelationsBoxLink title="Comunidades" section={comunidades} caminho="/comunidades"/>
          </BoxOpcao> 
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
                  link: dadosDoForm.get("link"),
                  creatorSlug: usuarioAleatorio,
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
              <div>
                <input 
                  placeholder="Coloque um link de acesso a comunidade"
                  name="link"
                  aria-label="Coloque um link de acesso a comunidade"
                />
              </div>

              <button>
                Criar comunidade
              </button>
              <button type="reset" value="Limpar">Limpar</button>
            </form>
          </Box>          
        </div>
        
          
      </MainGridOpcao>
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
    props: {
      githubUser
    }, 
  }
}
