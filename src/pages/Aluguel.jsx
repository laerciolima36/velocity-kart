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

const Aluguel = ({ tamanhox }) => {

    const { alugueis = [], error } = useAlugueisContext();
    const [showInfo, setShowInfo] = useState(false);

    return (
        <div >
            <Menu />
            <div className='container d-flex justify-content-end align-items-center mt-4'>
                <div className='' style={{ fontSize: "20px" }}>
                    <div className='rounded text-white d-flex' style={{ fontSize: "12px" }}>
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
                            <span>Terminando</span>
                        </div>
                    </div>
                </div>
                <FaInfoCircle className='text-white' onClick={() => setShowInfo(true)} style={{cursor: 'pointer'}} />
            </div>

            <div>
                <Link to="/fila" style={{ textDecoration: 'none', color: 'white', fontSize: '12px' }} className='d-flex justify-content-center align-items-center mt-2'>
                    Ver Fila
                </Link>
            </div>

            <InfoAluguel show={showInfo} onHide={() => setShowInfo(false)} />

            {!error && alugueis.length === 0 ? (
                <div style={{ margin: '20px 0', textAlign: 'center', color: 'white' }}>
                    Toque no + para registrar um novo aluguel
                </div>
            ) : (
                <Container>
                    <Row className='mt-4'>{
                        alugueis.map((aluguel) => (
                            <Col key={aluguel.id} xs={6} sm={4} md={4} lg={3} className="mb-4">
                                {/* <div style={{ backgroundColor: "red", width: "100%"}}>ITEM ALUGUEL</div> */}
                                <ItemAluguel key={aluguel.id} aluguel={aluguel} />
                            </Col>
                        ))
                    }
                    </Row>
                </Container>
            )}

            <NovoAluguel />

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

export default Aluguel;