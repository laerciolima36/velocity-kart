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



// Listar todos os produtos
export const listarProdutos = async () => {
    try {
        const response = await api.get("/api/produto");
        console.log("Response data:", response.data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Buscar produto por ID
export const buscarProdutoPorId = async (id) => {
    try {
        const response = await api.get(`/api/produto/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};


// Atualizar produto
export const atualizarProduto = async (id, produto) => {
    try {
        const response = await api.put(`/api/produto/${id}`, produto);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Deletar produto
export const deletarProduto = async (id) => {
    try {
        await api.delete(`/api/produto/${id}`);
        return true;
    } catch (error) {
        handleError(error);
    }
};

// Upload da imagem do produto
export const uploadFotoProduto = async (id, file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await api.put(`/api/produto/uploadFotoProduto/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export default {
    salvarContrato
};