import { createContext, useContext, useState, useEffect } from "react";
import { BASE_URL } from "../../config/axiosInstance";

const AlugueisContext = createContext({
  alugueis: [],
  erro: null
});

export const useAlugueisContext = () => useContext(AlugueisContext);

export const AlugueisProvider = ({ children }) => {
    const [alugueis, setAlugueis] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
            console.log("Iniciando conexão com o servidor...");
            const eventSource = new EventSource(BASE_URL + "/api/aluguel/stream");

            eventSource.onmessage = (e) => {
                const data = JSON.parse(e.data);
                setAlugueis(data);
                // console.log("Dados recebidos:", data);
                setError(null);
            };

            eventSource.onerror = (err) => {
                console.error("EventSource failed:", err);
                setError("Erro na conexão em tempo real. Tentando reconectar...");
            }

            eventSource.onopen = () => {
                console.log("Conexão com o servidor estabelecida.");
            };

            eventSource.onclose = () => {
                console.log("Conexão com o servidor fechada.");
            }

            return () => eventSource.close();
    }, []);

    return (
    <AlugueisContext.Provider value={{alugueis, error}}>
      {children}
    </AlugueisContext.Provider>
  );
}

export default AlugueisProvider;