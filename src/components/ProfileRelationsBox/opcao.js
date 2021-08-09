import { ProfileRelationsBoxWrapperOpcao } from '../ProfileRelations/opcao';


function ProfileRelationsBoxOpcao(props) {
  return (
    <ProfileRelationsBoxWrapperOpcao>
      <ul>
        {props.section.map((item, index) => {
          if (index <=41) {
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
    </ProfileRelationsBoxWrapperOpcao>
  );
}

export default ProfileRelationsBoxOpcao;