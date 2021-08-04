export default class DatoCMSService {
  static async getScraps(usuarioAleatorio) {
    const url = "https://graphql.datocms.com/";

    const resposta = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": "2a263ac93eb257022d2a57d176bdb4",
        "Content-Type": "application/json",
        "Accept": "application/json",
      }, 
      body: JSON.stringify({
        query: `query {
            allRecados{
              id
              text
              creatorSlug
            }
          }`,
      }),
    });

    const scraps = await resposta.json();
    return scraps;
  }
}
  
  