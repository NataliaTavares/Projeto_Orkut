import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGridOpcao from '../src/components/MainGrid/opcao'
import ProfileSidebar from '../src/components/ProfileSidebar'
import { AlurakutMenu,} from '../src/lib/AlurakutCommons';
import Box from '../src/components/Box';
import DatoCMSService from "../src/api/datocmsService";
import ScrapsBox from "../src/components/boxRecados";
import ScrapsList from "../src/components/listaRecados";




export default function recados(props) {
  const usuarioAleatorio = props.githubUser;
  const [scraps, setScraps] = React.useState([]);
  

  React.useEffect(function() {
    // GET
    DatoCMSService.getScraps().then((data) => {
      const allScraps = data.data.allRecados;
      setScraps(allScraps);
    });
}, [])    


  return (
    <>
      <AlurakutMenu githubUser={usuarioAleatorio} />
      <MainGridOpcao>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}> 
          <ProfileSidebar  githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>


          <ScrapsBox>
            <ScrapsList
              boxTitle={"Recados"}
              scraps={scraps}     
            />
          </ScrapsBox>
          
          <Box>
            <h2 className="subTitle">Deixar um recado</h2>
            <form onSubmit={function handleCreateScrap(e) {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                const scrap = {
                  text: dadosDoForm.get("text"),
                  creatorSlug: usuarioAleatorio,
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
    }, // will be passed to the page component as props
  }
}
