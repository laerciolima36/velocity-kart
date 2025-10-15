import api from "../../config/axiosInstance";

const handleError = (error) => {
  console.error("Erro na API Produto:", error);
  throw error.response?.data?.message || "Erro ao processar a requisição.";
};

// Listar todos os produtos
export const listarFila = async () => {
  try {
    const response = await api.get("/api/fila");
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const tamanhoFila = async () => {
  const fila = await listarFila();
  return fila.length;
}