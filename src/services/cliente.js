
import api from "./api";


let cachedPageNumber = 1;
let cachedPerPage = 10;
let cachedFilter = ''

const getCliente = async (id_centro_custo = null, pageNumber, perPage, filter) => {
    cachedPageNumber = pageNumber ?? cachedPageNumber;
    cachedPerPage = perPage ?? cachedPerPage;
    cachedFilter = filter ?? cachedFilter;

    try {
        const response = await api.get(`/cliente?id_centro_custo_cli=${id_centro_custo}&per_page=${cachedPerPage}&page_number=${cachedPageNumber}&filter=${cachedFilter}`);

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const deleteCliente = async (id) => {
    try {
        await api.delete(`/cliente/${id}`)
        return true
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};
const saveCliente = async (obj) => {
    
    try {
        if(obj.id_cliente_cli){
            return await api.put(`/cliente/${obj.id_cliente_cli}`, obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }else{
            return await api.post("/cliente", obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    } catch (error) {
        console.error("Erro ao buscar:", error);
        return false;
    }
};


export { deleteCliente, getCliente, saveCliente };

