import { ProfileRelationsBoxWrapper } from '../ProfileRelations';
import Link from 'next/link'


function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
      <Link href={props.caminho}>    
      {props.title} 
      </Link> 
      {" "}({props.section.length}) 
      </h2>
      <ul>
        {props.section.map((item, index) => {
          if (index <= 5) {
            return (
              <li key={item.id}>
                <a href={`${item.category}${item.name}`} target="_blank">  
                  <img src={item.imageUrl} />
                  <span>{item.name}</span>
                </a>
              </li>
            );
          }
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default ProfileRelationsBox;