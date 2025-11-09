import api from "../../config/axiosInstance";

const handleError = (error) => {
    console.error("Erro na API Contrato:", error);
    throw error.response?.data?.message || "Erro ao processar a requisição.";
};

//SALVAR CONTRATO
export const salvarContrato = async (contrato) => {
    try {
        const response = await api.post("/api/contratos/criar", contrato);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};


export const listarContratos = async () => {
    try {
        const response = await api.get("/api/contratos");
        console.log("Response data:", response.data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const listarContratosFinalizados = async () => {
    try {
        const response = await api.get("/api/contratos/finalizados");
        console.log("Response data:", response.data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};



export const iniciarContrato = async (id) => {
    try {
        const response = await api.post(`/api/contratos/${id}/iniciar`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};


export default {
    salvarContrato, listarContratos, iniciarContrato
};