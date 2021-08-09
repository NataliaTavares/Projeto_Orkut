import { ProfileRelationsBoxWrapper } from '../ProfileRelations';
import BoxLink from "../boxLink";


function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
       
      {props.title} 
      
      {" "}({props.section.length}) 
      </h2>
      <ul>
        {props.section.map((item, index) => {
          if (index <= 5) {
            return (
              <li key={item.id}>  
                <a href={`/profile/${item.title}`}>  
                  <img src={item.imageUrl} />
                  <span>{item.title}</span>
                </a>
              </li>
            );
          }
        })}
      </ul>
      <BoxLink url={props.caminho} linkTitlte={"Ver todos"}  />
    </ProfileRelationsBoxWrapper>
  );
}

export default ProfileRelationsBox;


                
            