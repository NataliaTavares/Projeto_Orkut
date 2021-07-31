import {github} from '../src/components/gitHubUser/gitHubUser';


export  function getServerSideProps(context) {
  const git = github(context)
  console.log('=======================')
  console.log(process.env.READ_ONLY_API_TOKEN)
  console.log(process.env.FULL_ACCESS_API_TOKEN)
  console.log(process.env.ID_MODEL)
  return {
    redirect: {
      destination: "https://github.com/"+`${git}`, 
      permanent: false,
    }
  }
}


export default function Perfil() { 
  
}
