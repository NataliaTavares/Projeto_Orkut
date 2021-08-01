import {github} from '../src/components/gitHubUser/gitHubUser';


export  function getServerSideProps(context) {
  const git = github(context)

  return {
    redirect: {
      destination: "https://github.com/"+`${git}`, 
      permanent: false,
    }
  }
}


export default function Perfil() { 
  
}
