import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { listarProdutos } from '../CadastroProduto/ProdutoService';
import ProdutoDropdown from './ProdutoDropdown';
import { criarAluguel } from './NovoAluguelService';
import Alert from 'react-bootstrap/Alert';
import Load from '../Load/Load';

const NovoAluguel = () => {
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

    const [nomeResponsavel, setNomeResponsavel] = useState('');
    const [nomeCrianca, setNomeCrianca] = useState('');
    const [produtoId, setProdutoId] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [pago, setPago] = useState(true);
    const [tempoEscolhido, setTempoEscolhido] = useState(15);

    const formRef = useRef();
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);
    // const [showModal, setShowModal] = useState(show);

    const handleSalvar = async () => {

        if (formRef.current && !formRef.current.checkValidity()) {
            formRef.current.reportValidity(); // mostra os erros nativos do navegador
            return;
        }

        try {
            setLoading(true);
            criarAluguel(montarAluguel());
            setLoading(false);
            onclose();
        } catch (error) {
            setLoading(false);
            setErro(error);
        }
    };

    const montarAluguel = () => {
        return {
            nomeResponsavel: nomeResponsavel.trim(),
            nomeCrianca: nomeCrianca.trim(),
            tempoEscolhido: tempoEscolhido,
            pago: pago,
            produto: {
                id: produtoId
            }
        };
    }

    useEffect(() => {
        // Simula uma chamada de API para buscar os produtos
        listarProdutos()
            .then((data) => {
                setProdutos(data);
                console.log("Produtos carregados:", data);
            })
            .catch((error) => {
                console.error("Erro ao carregar produtos:", error);
            });
    }, []);

    return (
        <>
            {loading && <Load />}

            {
                erro && (
                    <Alert
                        variant="danger"
                        onClose={() => setErro(null)}
                        dismissible
                        className="custom-alert"
                    >
                        Erro: {erro}
                    </Alert>
                )
            }
            <Modal show={show} onHide={null} centered>
                <Modal.Header
                    className='bg-dark text-white border border-info border-bottom-0 border-2'
                    closeButton
                    closeVariant="white"
                    onHide={onClose}
                >
                    <Modal.Title>Novo Aluguel</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark text-white border border-info border-top-0 border-bottom-0 border-2'>
                    <Form ref={formRef}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nome do Resposável</Form.Label>
                            <Form.Control
                                type="text"
                                value={nomeResponsavel}
                                onChange={(e) => setNomeResponsavel(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nome da Criança</Form.Label>
                            <Form.Control
                                type="text"
                                value={nomeCrianca}
                                onChange={(e) => setNomeCrianca(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>
                                <Form.Label>Selecione o Brinquedo:</Form.Label>
                                {/* <Form.Select aria-label="Selecione um produto" defaultValue="">
                                <option value="" disabled>Selecione um produto</option>
                                {produtos.map((produto) => (
                                    <option key={produto.id} value={produto.id}>
                                        {produto.nome}
                                    </option>
                                ))}
                            </Form.Select> */}

                                <ProdutoDropdown produtos={produtos} onSelect={(id) => setProdutoId(id)} />

                            </Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Row>
                                <Form.Label>Tempo Escolhido: {tempoEscolhido} </Form.Label>
                            </Row>

                            <Button variant="primary" onClick={() => setTempoEscolhido(15)}>15 min</Button>{' '}
                            <Button variant="primary" onClick={() => setTempoEscolhido(30)}>30 min</Button>{' '}
                            <Button variant="primary" onClick={() => setTempoEscolhido(tempoEscolhido + 5)}>+ 5 min</Button>{' '}
                            <Button
                                variant="primary"
                                onClick={() => setTempoEscolhido(tempoEscolhido > 5 ? tempoEscolhido - 5 : 5)}
                                disabled={tempoEscolhido <= 5}
                            >
                                - 5 min
                            </Button>{' '}
                            <br />
                            <br />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            {/* //FALTA FAZER */}
                            <div className='d-flex justify-content-between align-items-center mb-2'>
                                <Form.Label>Forma de Pagamento: </Form.Label>
                                <Form.Check // prettier-ignore
                                    type="switch"
                                    id="custom-switch"
                                    label="Pago"
                                    reverse
                                    checked={pago}
                                    onChange={() => { setPago(!pago) }}
                                />
                            </div>

                            <Form.Select aria-label="Default select example">
                                <option value="1">Pix</option>
                                <option value="2">Débito</option>
                                <option value="3">Crédito</option>
                            </Form.Select>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer className='bg-dark text-white border border-info border-top-0 border-2'>
                    <Button variant="secondary" onClick={handleSalvar}>Iniciar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}



export default NovoAluguel;