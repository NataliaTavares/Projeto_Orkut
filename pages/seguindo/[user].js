import React from 'react';
import { useRouter } from "next/router";
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGridOpcao from '../../src/components/MainGrid/opcao'
import ProfileSidebar from '../../src/components/ProfileSidebar'
import { AlurakutMenu,} from '../../src/lib/AlurakutCommons';
import ProfileRelationsBoxWrapperOpcao from '../../src/components/ProfileRelationsBox/opcao';
import BoxOpcao from '../../src/components/Box/opcao';

export default function seguindo(props) {
  const router = useRouter();
  const { user } = router.query;
  const githubUser = user;
  const [seguindo, setSeguindo] = React.useState([]);

  React.useEffect(function() {
    // GET
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
}, [])    


  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGridOpcao>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}> 
          <ProfileSidebar  githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <BoxOpcao>
            <h1 className="title">
              Seguindo
            </h1>
            <ProfileRelationsBoxWrapperOpcao title="Seguindo" section={seguindo}/>
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
