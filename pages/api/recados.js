import { SiteClient } from "datocms-client";

export default async function recebedorDeScraps(request, response) {
  if (request.method === 'POST') {
    const TOKEN = process.env.FULL_ACCESS_API_TOKEN;
    const client = new SiteClient(TOKEN);

    const registroCriado = await client.items.create({
      itemType: process.env.ID_MODEL_RECADOS, // Model ID
      ...request.body,
    });

    response.json({
      registroCriado: registroCriado,
    });

    return;
  }

  response.status(404).json({
    message: "Ainda não temos nada no GET, mas no POST tem!",
  });
}
