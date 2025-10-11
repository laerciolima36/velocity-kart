import api from "../../config/axiosInstance";

const handleError = (error) => {
  console.error("Erro na API Produto:", error);
  throw error.response?.data?.message || "Erro ao processar a requisição.";
};

export const criarAluguel = async (produto) => {
  try {
    const response = await api.post("/api/aluguel/criar", produto);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};