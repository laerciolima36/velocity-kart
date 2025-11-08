import React, { useState } from 'react';
import { Alert, Row, Col, Container } from 'react-bootstrap';
import Menu from '../components/Menu/Menu';
import Load from '../components/Load/Load';
import { useEffect } from 'react';
import { listarFila } from '../components/ItemFila/FilaService';
import { getInformacoes } from '../components/InfoAluguel/InfoAluguelService';
import BottomMenu from '../components/BottomMenu/BottomMenu';



const Fila = () => {

    const [error, setError] = useState(null);
    const [fila, setFila] = useState([]);
    const [loading, setLoading] = useState(false);
    const [informacoes, setInformacoes] = useState([]);
    const [erro, setErro] = useState(null);

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
        carregarInfo();
    }, []);

    return (
        <div >
            {loading && <Load />}

            <Menu titulo="Lista de Espera" />

            <Container className='text-white mt-4'>
                <Row className='mt-4'>
                    <span className='mb-2'>A Fila será mostrada abaixo:</span>
                    {informacoes && informacoes.map((info) => (
                        info.fila.length > 0 && (
                            <Col key={info.produtoId} xs={12} sm={4} md={4} lg={12} className="mb-4">
                                <div className='bg-secondary ps-3 pt-3 rounded' style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                    {info.nomeProduto} - {info.quantidadeNaFila} {info.quantidadeNaFila === 1 ? "pessoa" : "pessoas"} na fila (Tempo de Espera: {info.tempoEspera} min)
                                    <div style={{ overflowX: 'auto', padding: 12 }}>
                                        <div style={{ display: 'flex', minHeight: 10, padding: 12 }}>
                                            {info.fila.map((item) => (

                                                <div className='bg-dark p-3 m-2 rounded' style={{ minWidth: 250, maxWidth: 250 }} key={item.id}>
                                                    <div className='text-white justify-content-between align-items-center d-flex'>
                                                        👫 {item.aluguel.nomeResponsavel}
                                                    </div>
                                                    <div className='text-white'>
                                                        👶 {item.aluguel.nomeCrianca}
                                                    </div>
                                                    <div className='mt-4 text-center justify-content-center align-items-center d-flex flex-column'>
                                                        <img
                                                            // src={info.fotoProduto ? `/imagens/produtos/${produto.fotoProduto}` : "/imagens/produtos/placeholder.png"} //REMOVER O LOCALHOST
                                                            src={item.aluguel.produto.fotoProduto} //REMOVER O LOCALHOST
                                                            alt={item.aluguel.produto.nomeProduto}
                                                            style={{
                                                                width: "70px",
                                                                height: "70px",
                                                                objectFit: "contain",
                                                                borderRadius: 10,
                                                                cursor: "pointer",
                                                                border: "2px solid #ccc",
                                                            }}
                                                        />
                                                    </div>
                                                    <div className='text-end justify-content-end align-items-end d-flex flex-column mb-4'>

                                                    </div>
                                                    <div className='text-secondary text-center justify-content-center align-items-center d-flex flex-column mb-2' style={{ fontSize: '12px' }}>
                                                        🕑 Data de Entrada: {new Date(item.dataEntrada).toLocaleString()} - Tempo Escolhido: {item.aluguel.tempoEscolhido} min
                                                    </div>
                                                    <div className='text-secondary text-center justify-content-center align-items-center d-flex flex-column' style={{ fontSize: '12px' }}>
                                                        🚗 {item.aluguel.produto.nome} 💰 {item.aluguel.pago ? "Pago" : "Falta Pagar"}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Col>)
                    ))}
                </Row>
            </Container>


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

            <BottomMenu />
        </div>
    );
};

export default Fila;