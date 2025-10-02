import api from "../../config/axiosInstance";

const handleError = (error) => {
  console.error("Erro na API Produto:", error);
  throw error.response?.data?.message || "Erro ao processar a requisição.";
};

// Pausar o tempo de aluguel
export const pausarById = async (id) => {
  try {
    const response = await api.post(`/api/aluguel/${id}/pausar`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Retomar o tempo de aluguel
export const retomarById = async (id) => {
  try {
    const response = await api.post(`/api/aluguel/${id}/retomar`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export default { pausarById, retomarById };