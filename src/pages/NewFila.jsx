import { useEffect, useState } from 'react';
import { Alert, Badge, Container, ListGroup, Row, Col, Image } from 'react-bootstrap';
import { getInformacoes } from '../components/InfoAluguel/InfoAluguelService';
import Load from '../components/Load/Load';
import { BASE_URL } from "../config/axiosInstance";


const NewFila = () => {

    const [error, setError] = useState(null);
    const [fila, setFila] = useState([]);
    const [loading, setLoading] = useState(false);
    const [informacoes, setInformacoes] = useState([]);

    const carregarInfo = async () => {
        try {
            setLoading(true);
            const info = await getInformacoes();
            setInformacoes(info);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    useEffect(() => {
        console.log("Iniciando conexão com o servidor da fila...");
        const eventSource = new EventSource(BASE_URL + "/api/fila/stream");

        eventSource.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setFila(data);
            console.log("Dados recebidos do stream Fila:", data);
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

        <>
        {fila.length > 0 && (

            <><div className='mt-3 text-center mb-2 text-white border-bottom border-info'>
                    <h5>Fila</h5>
                </div><Container className='bg-dark p-3 rounded text-white' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>

                        {loading && <Load />}




                        <ListGroup variant="flush">
                            {fila
                                ?.slice() // cria uma cópia para não mutar o estado
                                .sort((a, b) => a.tempoParaIniciar - b.tempoParaIniciar)
                                .map((item, index) => (
                                    <ListGroup.Item key={item.id}>
                                        <Row className="align-items-center">

                                            <Col xs="auto">
                                                <Image
                                                    src={"/imagens/produtos/" + item.aluguel.produto.fotoProduto}
                                                    rounded
                                                    width={50}
                                                    height={50} />
                                            </Col>

                                            <Col>
                                                <div className="fw-semibold">{index + 1}.{item.aluguel.nomeCrianca}</div>
                                                <small className="text-muted">{item.aluguel.produto.nome}</small>
                                            </Col>

                                            <Col xs="auto">
                                                <Badge bg="primary" pill>
                                                    {item.tempoParaIniciar} min
                                                </Badge>
                                            </Col>

                                        </Row>
                                    </ListGroup.Item>
                                ))}
                        </ListGroup>


                        {error && (
                            <Alert
                                variant="danger"
                                //onClose={() => setErro(null)}
                                dismissible
                                className="custom-alert"
                            >
                                Erro: {error}
                            </Alert>
                        )}

                    </Container></>
            )}
        </>

    );
};

export default NewFila;