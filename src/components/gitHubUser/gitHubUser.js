import nookies from 'nookies';
import jwt from 'jsonwebtoken';

export function github(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  
  

  const { githubUser } = jwt.decode(token);
 
  return githubUser
    
      
}
