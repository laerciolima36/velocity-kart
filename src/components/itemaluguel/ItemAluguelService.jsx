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

//atualiza a flag view do aluguel finalizado para ser mostrado ou nao na page aluguel
export const setFlagFalse = async (id) => {
  try {
    const response = await api.put(`/api/aluguel/finalizado/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const reproduzirAudioFinal = async (id) => {
  try {
    const response = await api.post(`/api/aluguel/audiofinal/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const cancelarAluguel = async (id) => {
  try {
    const response = await api.post(`/api/aluguel/${id}/finalizar`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

//lista todos os alugueis caso a flag view seja true
export const listarAlugueisFinalizados = async () => {
  try {
    const response = await api.get("/api/aluguel/finalizados");

    if (!Array.isArray(response.data)) {
      console.error("Resposta inesperada da API:", response.data);
      return [];
    }

    return response.data;
  } catch (error) {
    handleError(error);
    return []; // 🔥 essencial
  }
};

export default { pausarById, retomarById, listarAlugueisFinalizados, setFlagFalse, reproduzirAudioFinal };