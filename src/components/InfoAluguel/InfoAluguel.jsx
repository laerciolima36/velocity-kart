import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Card } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import Load from '../Load/Load';
import { getInformacoes } from './InfoAluguelService';
import { FaInfoCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";


const InfoAluguel = ({ show, onHide }) => {

    const [informacoes, setInformacoes] = useState(null);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);

    const carregarInfo = async () => {
        try {
            setLoading(true);
            const info = await getInformacoes();
            setInformacoes(info);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setErro(error);
        }
    };

    useEffect(() => {
        if (show) {
            carregarInfo();
        }
    }, [show]);

    return (
        <>
            {loading && <Load />}


            {erro && (
                <Alert
                    variant="danger"
                    onClose={() => setErro(null)}
                    dismissible
                    className="custom-alert"
                >
                    Erro: {erro}
                </Alert>
            )}
            <div className='d-flex justify-content-center align-items-center m-4' >
                <Modal
                    show={show} // <-- Este é o método correto para exibir o modal
                    onHide={onHide}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton style={{ backgroundColor: "violet", color: 'black' }}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <div className='d-flex align-items-center'>
                                <FaInfoCircle className='text-white me-2' /> Informações
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            {informacoes && informacoes.map((info, index) => (
                                <Col key={info.id} xs={12} sm={2} md={4} lg={4} className="mb-2">
                                    <Card key={index} className="mb-2">
                                        <Card.Body>
                                            <Card.Title>{info.nomeProduto} {info.disponivel ? <FaCircle style={{ color: "green" }} /> : <FaCircle style={{ color: "red" }} />}</Card.Title>
                                            <Card.Text>
                                                <Row>
                                                    <Col xs={8}>
                                                        <div>
                                                            Na Fila: {info.quantidadeNaFila}
                                                        </div>
                                                        <div>
                                                            Tempo de Espera: {info.tempoEspera} min
                                                        </div>
                                                    </Col>
                                                    <Col className="d-flex justify-content-end align-items-center">
                                                        <img
                                                            // src={info.fotoProduto ? `/imagens/produtos/${produto.fotoProduto}` : "/imagens/produtos/placeholder.png"} //REMOVER O LOCALHOST
                                                            src={info.fotoProduto} //REMOVER O LOCALHOST
                                                            alt={info.nomeProduto}
                                                            style={{
                                                                width: "70px",
                                                                height: "70px",
                                                                objectFit: "contain",
                                                                borderRadius: 10,
                                                                cursor: "pointer",
                                                                border: "2px solid #ccc",
                                                            }}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={onHide}>Fechar</Button>
                    </Modal.Footer>
                </Modal >
            </div >
        </>
    );
};

export default InfoAluguel;