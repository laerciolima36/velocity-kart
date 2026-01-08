import React, { useEffect, useState } from 'react';
import { Alert, Row, Col, Container, Button } from 'react-bootstrap';
import Menu from '../components/Menu/Menu';
import ItemAluguel from '../components/itemaluguel/ItemAluguel';
import NovoAluguel from '../components/novoaluguel/NovoAluguel';
import { useAlugueisContext } from '../store/AlugueisProvider/AlugueisProvider';
import { Link } from 'react-router-dom';
import './css/style.css';
import InfoAluguel from '../components/InfoAluguel/InfoAluguel';
import { FaInfoCircle } from "react-icons/fa";
import { listarAlugueisFinalizados, setFlagFalse } from '../components/itemaluguel/ItemAluguelService';
import BottomMenu from '../components/BottomMenu/BottomMenu';
import { IoIosAddCircle } from "react-icons/io";
import NewFila from './NewFila';
import ItemFila from '../components/ItemFila/ItemFila';


const Aluguel = ({ tamanhox }) => {

    const { alugueis = [], error } = useAlugueisContext();
    const [showInfo, setShowInfo] = useState(false);
    const [alugueisFinalizados, setAlugueisFinalizados] = useState([]);

    const carregarAlugueisFinalizados = async () => {
        try {
            // setLoading(true);
            const lista = await listarAlugueisFinalizados();
            setAlugueisFinalizados(lista);
            // setLoading(false);
            console.log('rodou carregar alugueis finalizados');
        } catch (error) {
            // setLoading(false);
            // setErro(error);
            console.log(error);
        }
    };

    useEffect(() => {
        carregarAlugueisFinalizados();
    }, [alugueis.length]);

    const existeFila = alugueis?.some(aluguel => aluguel.estado === 'fila');
    const existeRodando = alugueis?.some(aluguel => aluguel.estado === 'iniciado' || aluguel.estado === 'pausado');

    return (
        <div >
            <Menu />
            <div className='container d-flex justify-content-end align-items-center mt-4'>
                <div>
                    <div className='text-white d-flex text-center justify-content-center align-items-center' style={{ fontSize: "12px" }}>
                        <div className='me-2' style={{ fontSize: '12px' }}>
                            <span>Legenda:</span>
                        </div>
                        <div className='me-2' style={{ color: '#ff00fbff', fontSize: '12px' }}>
                            <span>Iniciado</span>
                        </div>
                        <div className='me-2' style={{ color: '#eeff00ff', fontSize: '12px' }}>
                            <span>Pausado</span>
                        </div>
                        <div className='me-2' style={{ color: '#ff0000ff', fontSize: '12px' }}>
                            <span>Finalizado</span>
                        </div>
                        <div className='me-2' style={{ color: '#ff0000ff', fontSize: '12px' }}>
                            <Button variant='secondary' size='sm'>
                                <FaInfoCircle className='text-white' onClick={() => setShowInfo(true)} style={{ cursor: 'pointer' }} />
                            </Button>
                        </div>
                        {/* <div className='ms-2'>
                            <Link to="/fila" style={{ textDecoration: 'none', color: 'white', fontSize: '12px' }}>
                                <Button variant='info' size='sm'>Ver Fila</Button>
                            </Link>
                        </div> */}
                    </div>
                </div>
            </div>


            <InfoAluguel show={showInfo} onHide={() => setShowInfo(false)} />

            <Container>
                <Row>
                    <Col md={9}>
                        <Row className='m-2'>
                            {alugueisFinalizados.length > 0 &&
                                <div className='mt-3 text-center mb-2 text-white border-bottom border-info'>
                                    <h5>Finalizados</h5>
                                </div>
                            }
                            {
                                alugueisFinalizados && alugueisFinalizados.map((aluguel) => (
                                    <Col key={aluguel.id} xs={6} sm={4} md={4} lg={3} className="mb-2 p-0">
                                        <ItemAluguel key={aluguel.id} aluguel={aluguel} carregarAlugueisFinalizados={carregarAlugueisFinalizados} />
                                    </Col>
                                ))
                            }
                        </Row>
                        {!error && alugueis.length === 0 ? (
                            <div style={{ margin: '20px 0', textAlign: 'center', color: 'white', marginTop: '150px' }}>
                                Toque no <IoIosAddCircle style={{ fontSize: "24px" }} /> para registrar um novo aluguel
                            </div>
                        ) : (
                            <Row className='m-2'>
                                {existeRodando &&
                                    <div className='mt-3 text-center mb-2 text-white border-bottom border-info'>
                                        <h5>Em Andamento</h5>
                                    </div>
                                }
                                {
                                    alugueis?.length > 0 && alugueis.map((aluguel) => (
                                        aluguel.estado !== 'fila' ? (
                                            <Col key={aluguel.id} xs={6} sm={4} md={4} lg={3} className="mb-2 p-0">
                                                <ItemAluguel aluguel={aluguel} />
                                            </Col>
                                        ) : (
                                            null
                                        )
                                    ))
                                }
                            </Row>
                        )
                        }
                    </Col>


                    <Col md={3} className='ps-4 pe-4'>
                        <Row className='mb-4'>
                            {existeFila &&
                                <div className='mt-3 text-center mb-2 text-white '>
                                    <h5>Aguardando para Iniciar</h5>
                                </div>
                            }
                            <Container className='bg-dark rounded text-white mb-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                                {alugueis?.length > 0 && alugueis.map((aluguel) =>
                                (
                                    aluguel.estado === 'fila' ? (
                                        <Row>
                                            <ItemFila aluguel={aluguel} />
                                        </Row>
                                    ) : (
                                        null
                                    )
                                ))
                                }

                            </Container>
                        </Row>
                        <Row className='mb-6'>
                            <NewFila />
                        </Row>
                        <Row className='mb-6'>
                            <div style={{ height: '100px' }}></div>
                            {/* para deixar espaco em baixo */}
                        </Row>
                    </Col>
                </Row>
            </Container>

            <NovoAluguel />

            {
                error && (
                    <Alert
                        variant="danger"
                        //onClose={() => setErro(null)}
                        // dismissible
                        className="custom-alert"
                    >
                        Erro: {error}
                    </Alert>
                )
            }

            <Row className='mb-6'>
                <div style={{ height: '100px' }}></div>
                {/* para deixar espaco em baixo */}
            </Row>

            <div className='pt-4'>
                <BottomMenu />
            </div>
        </div >
    );
};

export default Aluguel;