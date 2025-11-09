import React from 'react';
import { Accordion, Button, Card, ListGroup, Col, Row } from 'react-bootstrap';
import { listarContratos, listarContratosFinalizados } from '../FormContrato/ContratoService';
import { useEffect, useState } from 'react';
import Load from '../Load/Load';
import { iniciarContrato } from '../FormContrato/ContratoService';
import { useNavigate } from 'react-router-dom';

const ListaContratos = ({ estado, title }) => {

    const [contratos, setContratos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);
    const navigate = useNavigate();

    const carregarContratos = async () => {
        try {
            setLoading(true);
            if (estado) {
                const lista = await listarContratos();
                setContratos(lista);

            } else {
                const lista = await listarContratosFinalizados();
                setContratos(lista);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setErro(error);
        }
    };

    useEffect(() => {
        carregarContratos();
    }, []);

    const iniciar = (id) => {
        iniciarContrato(id).then(() => {
            navigate("/");
        }).catch((error) => {
            setErro(error);
        });
    }


    return (
        <div className="container-fluid p-2">

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

            <Accordion defaultActiveKey="0" className='mb-4'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{title}</Accordion.Header>
                    <Accordion.Body>
                        {contratos && contratos.map((contrato) => (
                            <div key={contrato.id}>
                                <Accordion className='mb-4'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Contrato ID: {contrato.id} - Cliente: {contrato.nomeContratante}</Accordion.Header>
                                        <Accordion.Body>
                                            <Row>
                                                <Col>
                                                    <Card className='mt-4'>
                                                        <Card.Header><strong>Dados do Contrato</strong></Card.Header>
                                                        <Card.Body>
                                                            <Row className="align-items-center mb-2">
                                                                {/* Dados do contrato */}
                                                                <Col xs={12} md={8}>
                                                                    Cliente: {contrato.nomeContratante}<br />
                                                                    Endereço: {contrato.enderecoContratante + ", " + contrato.numeroEndContratante + " - " + contrato.bairroContratante}<br />
                                                                    Telefone: {contrato.telefoneContratante}<br />
                                                                    <strong>Data de Início: {new Date(contrato.dataInicio).toLocaleDateString()}</strong><br />
                                                                    <strong>Hora de Início: {contrato.horaInicio}</strong><br /><br />
                                                                    Valor Total: R$ {contrato.valorTotal.toFixed(2)}<br />
                                                                </Col>

                                                                {/* Assinatura */}
                                                                <Col xs={12} md={4} className="d-flex justify-content-md-end justify-content-center mt-3 mt-md-0">
                                                                    <div style={{ textAlign: "center" }}>
                                                                        <img
                                                                            src={contrato.assinatura}
                                                                            alt={"Assinatura de " + contrato.nomeContratante}
                                                                            style={{
                                                                                width: "280px",
                                                                                height: "150px",
                                                                                objectFit: "contain",
                                                                                borderRadius: 10,
                                                                                cursor: "pointer",
                                                                                border: "2px solid #ccc",
                                                                            }}
                                                                        />
                                                                        <div>Assinatura</div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Card.Body>

                                                    </Card>
                                                </Col>

                                                <Col>
                                                    <Card className='mt-4'>
                                                        <Card.Header><strong>Serviços Contratados</strong></Card.Header>
                                                        {contrato.itens && contrato.itens.map((item, index) => (
                                                            <ListGroup key={item.id} variant="flush">
                                                                <ListGroup.Item>
                                                                    <div className='d-flex justify-content-start align-items-center mb-2'>
                                                                        <Col md="auto" className="me-3">
                                                                            <img
                                                                                src={item.produto.fotoProduto ? `/imagens/produtos/${item.produto.fotoProduto}` : "/imagens/produtos/placeholder.png"}
                                                                                alt={item.produto.nomeProduto}
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
                                                                        <Col>
                                                                            {item.produto.nome}<br />
                                                                            Tempo de Uso {item.tempoUso} minutos <br />
                                                                            R$ {item.valor.toFixed(2)}
                                                                        </Col>
                                                                    </div>
                                                                </ListGroup.Item>
                                                            </ListGroup>
                                                        ))}
                                                    </Card>
                                                </Col>
                                            </Row>

                                            <div className='mt-3 mb-2'>
                                                {!contrato.finalizado ? (
                                                    <Button variant="success" onClick={() => iniciar(contrato.id)}>Iniciar Contrato</Button>
                                                ) : (
                                                    <Button variant="danger" disabled>Contrato Finalizado</Button>
                                                )}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div >
    );
};

export default ListaContratos;