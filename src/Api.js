

const BASE_API = 'http://localhost:8000/api';

export default {

     base_storage: 'http://localhost:8000/storage',


     getTenant: async (id) => {
        const req = await fetch(`${BASE_API}/tenant/${id}`);
        const json = await req.json();
        return json;
    }, 

};
