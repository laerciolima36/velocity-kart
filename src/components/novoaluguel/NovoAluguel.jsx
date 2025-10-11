import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const NovoAluguel = () => {
    // controle do modal da bolinha +
    const [showModal, setShowModal] = useState(false);

    function abrirModal() {
        setShowModal(true);
    }

    function fecharModal() {
        setShowModal(false);
    }

    return (
        <div>
            <FloatingAddButton onClick={abrirModal} />
            {/* modal simples */}
            <SimpleModal show={showModal} onClose={fecharModal} />
        </div>
    );
}

function FloatingAddButton({ onClick }) {
    const fabStyle = {
        position: 'fixed',
        right: 24,
        bottom: 24,
        width: 56,
        height: 56,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 28,
        boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
        zIndex: 1050,
    };
    return (
        <Button variant="dark" style={fabStyle} onClick={onClick} aria-label="Adicionar">
            +
        </Button>
    );
}

function SimpleModal({ show, onClose }) {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Novo Aluguel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nome do Resposável</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nome da Criança</Form.Label>
                        <Form.Control type="text" />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>
                            <Form.Label>Selecione o Brinquedo:</Form.Label>

                            <Form.Select aria-label="Default select example">

                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tempo Escolhido:
                        </Form.Label>
                        <Form.Control type="text" />
                        <Button variant="primary">5 min</Button>
                        <Button variant="primary">10 min</Button>
                        <Button variant="primary">15 min</Button>
                        <Button variant="primary">20 min</Button>
                        <Button variant="primary">25 min</Button>
                        <Button variant="primary">30 min</Button>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>
                            <Form.Label>Selecione a Forma de Pagamento:</Form.Label>
                            <Form.Select aria-label="Default select example">

                                <option value="1">Pix</option>
                                <option value="2">Débito</option>
                                <option value="3">Crédito</option>
                            </Form.Select>
                        </Form.Label>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Iniciar</Button>
            </Modal.Footer>
        </Modal>
    );
}



export default NovoAluguel;