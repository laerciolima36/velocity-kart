import React, { useState } from 'react';
import { Alert, Row, Col, Container } from 'react-bootstrap';
import Menu from '../components/Menu/Menu';
import Load from '../components/Load/Load';
import { useEffect } from 'react';
import { listarFila } from '../components/ItemFila/FilaService';


const Fila = () => {

    const [error, setError] = useState(null);
    const [fila, setFila] = useState([]);
    const [loading, setLoading] = useState(false);

    const carregarFila = async () => {
        try {
            setLoading(true);
            const lista = await listarFila();
            setFila(lista);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    useEffect(() => {
        carregarFila();
    }, []);

    return (
        <div >
            {loading && <Load />}

            <Menu />


            <Container className='text-white mt-4'>
                Fila de Aluguéis
                <Row>
                    {fila.map((item) => (
                        <Col key={item.id} md={6} lg={4} className="mb-4">
                            <div className="p-3 border rounded">
                                <h5>Responsável: {item.aluguel.nomeResponsavel}</h5>
                                <p>Criança: {item.aluguel.nomeCrianca}</p>
                                <p>Produto: {item.aluguel.produto.nome}</p>
                                <img
                                    src={item.aluguel.produto.fotoProduto}
                                    alt={item.aluguel.produto.nome}
                                    style={{ width: '100%', maxWidth: 200, height: 'auto' }}
                                />
                                <p>Tempo Escolhido: {item.aluguel.tempoEscolhido} min</p>
                                <p>Tempo Restante: {item.aluguel.tempoRestante} min</p>
                                <p>Pago: {item.aluguel.pago ? 'Sim' : 'Não'}</p>
                                <p>Estado: {item.aluguel.estado}</p>
                                <p>Data de Entrada: {new Date(item.dataEntrada).toLocaleString()}</p>
                            </div>
                        </Col>
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
        </div>
    );
};

export default Fila;