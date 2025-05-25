
import api from "./api";


const getMetodoPagamento = async () => {
    try {
        const response = await api.get("/metodoPagamento");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const deleteMetodoPagamento = async (id) => {
    try {
        await api.delete(`/metodoPagamento/${id}`)
        return true
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};
const saveMetodoPagamento = async (obj) => {
    try {
        if(obj.id_metodo_pagamento_tmp){
            await api.put(`/metodoPagamento/${obj.id_metodo_pagamento_tmp}`, obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }else{
            await api.post("/metodoPagamento", obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        return true;
    } catch (error) {
        console.error("Erro ao buscar:", error);
        return false;
    }
};


export { deleteMetodoPagamento, getMetodoPagamento, saveMetodoPagamento };

