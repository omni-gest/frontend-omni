import api from "./api";

export async function createComboMaterial(request) {
    return await api.post("/combo", request);
}

export async function updateComboMaterial(request) {
    return await api.put("/combo", request);
}

export async function getComboMateriais(filter, pageNumber, totalSize, id_centro_custo) {
    const params = {
        filter: filter || "",
        page: pageNumber || 1,
        size: totalSize || 10,
        id_centro_custo: id_centro_custo || null
    };
    const response = await api.get("/combo", { params });
    return response.data;
}