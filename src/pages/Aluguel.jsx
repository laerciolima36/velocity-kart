import React from 'react';
import { Alert, Row, Col, Container } from 'react-bootstrap';
import Menu from '../components/Menu/Menu';
import ItemAluguel from '../components/itemaluguel/ItemAluguel';
import NovoAluguel from '../components/novoaluguel/NovoAluguel';
import { useAlugueisContext } from '../store/AlugueisProvider/AlugueisProvider';
import './css/style.css';


const Aluguel = () => {

    const { alugueis = [], error } = useAlugueisContext();

    return (
        <div >
            <Menu />
            <div className='mt-2 rounded text-white justify-content-center d-flex align-itens-center' style={{fontSize: "12px"}}> 
                <div className='m-2' style={{fontSize: '12px'}}>
                    <span>Legenda:</span>
                </div>
                <div className='m-2' style={{color: '#ff00fbff', fontSize: '12px'}}>
                    <span>Iniciado</span>
                </div>
                <div className='m-2' style={{color: '#eeff00ff', fontSize: '12px'}}>
                    <span>Pausado</span>
                </div>
                <div className='m-2' style={{color: '#ff0000ff', fontSize: '12px'}}>
                    <span>Terminando</span>
                </div>
            </div>

            {!error && alugueis.length === 0 ? (
                <div style={{ margin: '20px 0', textAlign: 'center' }}>
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