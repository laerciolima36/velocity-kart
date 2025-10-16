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
import { MdToys } from "react-icons/md";
import './novoaluguel.css';
import { getInformacoes } from '../InfoAluguel/InfoAluguelService';



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
    const [pago, setPago] = useState(true);
    const [tempoEscolhido, setTempoEscolhido] = useState(15);

    const [atendente, setAtendente] = useState();
    const [formaPagamento, setFormaPagamento] = useState("Pix");

    const formRef = useRef();
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);
    // const [showModal, setShowModal] = useState(show);
    const [informacoes, setInformacoes] = useState(null);

    const handleSalvar = async () => {

        if (formRef.current && !formRef.current.checkValidity()) {
            formRef.current.reportValidity(); // mostra os erros nativos do navegador
            return;
        }

        if (nomeResponsavel.trim() === '') {
            setErro('O nome do responsável é obrigatório.');
            return;
        }

        if (nomeCrianca.trim() === '') {
            setErro('O nome da criança/jovem é obrigatório.');
            return;
        }

        if (!produtoId) {
            setErro('Selecione um brinquedo.');
            return;
        }

        if (tempoEscolhido < 1) {
            setErro('O tempo escolhido deve ser pelo menos 1 minuto.');
            return;
        }

        try {
            setLoading(true);
            criarAluguel(montarAluguel());
            setLoading(false);
            onClose();
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
            },
            atendente: atendente,
            formaPagamento: formaPagamento
        };
    }

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
            setNomeResponsavel('');
            setNomeCrianca('');
            setProdutoId(null);
            setTempoEscolhido(15);
            setErro(null);
        }
    }, [show]);

    return (
        <>
            {loading && <Load />}

            {
                erro && (
                    <Alert
                        xs={12} sm={6} md={4} lg={3}
                        variant="danger"
                        onClose={() => setErro(null)}
                        dismissible
                        className="custom-alert"
                    >
                        Erro: {erro}
                    </Alert>
                )
            }
            <Modal show={show} onHide={null} centered size="xl">
                <Modal.Header
                    // className='border border-info border-bottom-0 border-2'
                    closeButton
                    closeVariant="white"
                    onHide={onClose}
                    style={{ backgroundColor: "violet", color: 'black' }}
                >
                    <Modal.Title><MdToys /> Novo Aluguel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form ref={formRef}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label><strong>Nome do Responsável</strong></Form.Label>
                            <Form.Control
                                className="input-violet"
                                type="text"
                                value={nomeResponsavel}
                                onChange={(e) => setNomeResponsavel(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label><strong>Nome da Criança/Jovem</strong></Form.Label>
                            <Form.Control
                                className="input-violet"
                                type="text"
                                value={nomeCrianca}
                                onChange={(e) => setNomeCrianca(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Selecione o Brinquedo:</Form.Label>
                        </Form.Group>

                        <ProdutoDropdown informacoes={informacoes} onSelect={(id) => setProdutoId(id)} />

                        <Form.Group className="mt-3" controlId="exampleForm.ControlInput1">
                            <Row className='text-center mb-2'>
                                <Form.Label>Tempo Escolhido: <strong><span style={{ fontSize: "26px", color: "red" }}>{tempoEscolhido}</span></strong> minutos</Form.Label>
                            </Row>
                            <div className='text-center mb-2'>

                                <Row md={3} xl={6} lg={3} xs={4} className='justify-content-center'>

                                    <Button className='m-2' variant='secondary' onClick={() => setTempoEscolhido(10)}>10 min</Button>{' '}
                                    <Button className='m-2' variant='secondary' onClick={() => setTempoEscolhido(15)}>15 min</Button>{' '}
                                    <Button className='m-2' variant='secondary' onClick={() => setTempoEscolhido(20)}>20 min</Button>{' '}
                                    <Button className='m-2' variant='secondary' onClick={() => setTempoEscolhido(30)}>30 min</Button>{' '}
                                    <Button className='m-2' variant='secondary' onClick={() => setTempoEscolhido(tempoEscolhido + 5)}>+ 5 min</Button>{' '}
                                    <Button
                                        className='m-2'
                                        variant='secondary'
                                        onClick={() => setTempoEscolhido(tempoEscolhido > 5 ? tempoEscolhido - 5 : 5)}
                                    >
                                        - 5 min
                                    </Button>{' '}
                                    <Button
                                        className='m-2'
                                        variant='secondary'
                                        onClick={() => setTempoEscolhido(tempoEscolhido + 1)}
                                    >
                                        + 1 min
                                    </Button>{' '}
                                    <Button
                                        className='m-2'
                                        variant='secondary'
                                        onClick={() => setTempoEscolhido(tempoEscolhido > 1 ? tempoEscolhido - 1 : 1)}
                                        disabled={tempoEscolhido <= 1}
                                    >
                                        - 1 min
                                    </Button>{' '}
                                    <br />
                                    <br />
                                </Row>
                            </div>

                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            {/* //FALTA FAZER */}
                            <div className='d-flex justify-content-between align-items-center'>
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

                            <Form.Select className="input-violet mb-2" aria-label="Default select example"
                                value={formaPagamento}
                                onChange={(e) => setFormaPagamento(e.target.value)}
                            >
                                <option>Pix</option>
                                <option>Cartao de Crédito</option>
                                <option>Cartao de Débito</option>
                                <option>Dinheiro</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Atendente</Form.Label>
                            <Form.Control
                                className="input-violet"
                                type="text"
                                value={atendente}
                                onChange={(e) => setAtendente(e.target.value)}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleSalvar}>Iniciar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}



export default NovoAluguel;