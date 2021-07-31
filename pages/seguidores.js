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
  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function() {
    // GET
    fetch(`https://api.github.com/users/${usuarioAleatorio}/followers`)
      .then((response) => response.json())
      .then(function (finalResult) {
        const seguidoresMap = finalResult.map(({ id, login, avatar_url }) => ({
          id: id,
          name: login,
          imageUrl: avatar_url,
          category: "https://github.com/",
          
        }));
        return setSeguidores(seguidoresMap);
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
          <BoxOpcao>
            <h1 className="title">
              Seguidores 
            </h1>
            <ProfileRelationsBoxWrapperOpcao title="Seguidores" section={seguidores} caminho="/seguidores"/>
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
    }, // will be passed to the page component as props
  }
}
