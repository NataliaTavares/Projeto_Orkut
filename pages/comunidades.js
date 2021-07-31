import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGridOpcao from '../src/components/MainGrid/opcao'
import ProfileSidebar from '../src/components/ProfileSidebar'
import { AlurakutMenu,} from '../src/lib/AlurakutCommons';
import ProfileRelationsBoxWrapperOpcao from '../src/components/ProfileRelationsBox/opcao';
import BoxOpcao from '../src/components/Box/opcao';




export default function sobre_nos(props) {
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
            <ProfileRelationsBoxWrapperOpcao title="Comunidades" section={comunidades} caminho="/comunidades"/>
          </BoxOpcao>
              
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
