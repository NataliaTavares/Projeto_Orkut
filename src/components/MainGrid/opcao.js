import styled from 'styled-components';
const MainGridOpcao = styled.main`
  width: 100%;
  grid-gap: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  padding: 16px;
  .profileArea {
    display: none;
    @media(min-width: 860px) {
      display: block;
    }
  }
  @media(min-width: 860px) {
    max-width: 900px;
    display: grid;
    grid-template-areas: 
      "profileArea welcomeArea ";
    grid-template-columns: 160px 1fr;
  }
`;
export default MainGridOpcao;