import React from 'react';
import { Alert, Row, Col, Container } from 'react-bootstrap';
import Menu from '../components/Menu/Menu';
import ItemAluguel from '../components/ItemAluguel/ItemAluguel';
import NovoAluguel from '../components/novoaluguel/NovoAluguel';
import { useAlugueisContext } from '../store/AlugueisProvider/AlugueisProvider';
import './css/style.css';


const Aluguel = () => {

    const { alugueis = [], error } = useAlugueisContext();

    return (
        <div >
            <Menu />

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