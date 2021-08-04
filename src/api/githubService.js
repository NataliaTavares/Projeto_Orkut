export default class GitHubService {
    static async getUsername(githubUser) {
      const url = `https://api.github.com/users/${githubUser}`;
      const resposta = await fetch(url);
      const username = await resposta.json();
      return username;
    }
  }
  