

//const BASE_API = 'http://localhost:8000/api';
const BASE_API = 'http://192.168.0.117:8000/api';

export default {

     //base_storage: 'http://localhost:8000/storage',
     base_storage: 'http://192.168.0.117:8000/storage',


     getTenant: async (id) => {
        const req = await fetch(`${BASE_API}/tenant/${id}`);
        const json = await req.json();
        return json;
    }, 

    sendPedido: async (id) => {
        const req = await fetch(`${BASE_API}/tenant/${id}`);
        const json = await req.json();
        return json;
    }, 

    addPedido: async (delivery,tenant_id,nome,telefone,endereco,taxa_id,pagamento_id,observacao,itensPedido) => {
        const response = await fetch(`${BASE_API}/pedidos`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({delivery,tenant_id,nome,telefone,endereco,taxa_id,pagamento_id,observacao,itensPedido})
        });
      return response;
    },

};
