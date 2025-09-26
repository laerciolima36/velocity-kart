import api from "../../config/axiosInstance";

const handleError = (error) => {
  console.error("Erro na API Produto:", error);
  throw error.response?.data?.message || "Erro ao processar a requisição.";
};

// CRIAR NOVA VENDA
export const salvarVenda = async (venda) => {
  try {

    const response = await api.post("/api/vendas", venda);
    console.log("Venda salva:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const buscarPorPeriodo = async (dataInicio, dataFim) => {
  try {
    const response = await api.get('/api/vendas/periodo', {
      params: {
        inicio: dataInicio,
        fim: dataFim
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Erro ao buscar vendas log:", error);
    console.error('Erro ao buscar vendas', error);
  }
};