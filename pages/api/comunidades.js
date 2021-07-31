import { SiteClient } from 'datocms-client';


export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST') {
        const TOKEN = process.env.FULL_ACCESS_API_TOKEN;                
        const client = new SiteClient(TOKEN);
        
       
        const registroCriado = await client.items.create({
            itemType: process.env.ID_MODEL, 
            ...request.body,
           
        })
    
        console.log(registroCriado);
    
        response.json({
            dados: 'Hello',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}