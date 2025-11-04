// ItemAluguel.jsx
import React, { useState, useEffect } from 'react';
import {
    Table,
    Button,
    Form,
    InputGroup,
    Modal,
    Spinner,
    Accordion
} from "react-bootstrap"; import Card from 'react-bootstrap/Card';
import { listarProdutos } from '../CadastroProduto/ProdutoService';


const FormContrato = () => {

    const [telefone, setTelefone] = useState("");
    const [horaInicio, setHoraInicio] = useState('');

    const [produtos, setProdutos] = useState([]);
    const [selecionados, setSelecionados] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const carregarProdutos = async () => {
        try {
            const lista = await listarProdutos();
            setProdutos(lista);
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        }
    };

    // Carregar lista de produtos da API
    useEffect(() => {
        carregarProdutos();
    }, []);

    // Adicionar produto selecionado
    const adicionarProduto = (produto) => {
        // Evitar duplicados
        if (selecionados.find((p) => p.id === produto.id)) return;
        setSelecionados([...selecionados, { ...produto, tempoUso: "" }]);
    };

    // Atualizar tempo de uso
    const atualizarTempo = (id, tempo) => {
        setSelecionados((prev) =>
            prev.map((p) => (p.id === id ? { ...p, tempoUso: tempo } : p))
        );
    };

    // Remover produto da seleção
    const removerProduto = (id) => {
        setSelecionados(selecionados.filter((p) => p.id !== id));
    };

    const enviar = async () => {
        console.log("Produtos selecionados:", selecionados);
        // Exemplo de envio:
        // await axios.post("http://localhost:8080/api/uso", selecionados);
    };


    const handleChange = (e) => {
        const raw = e.target.value;
        const digits = raw.replace(/\D/g, "");

        // limita a 11 dígitos (2 DDD + 9)
        const limited = digits.substring(0, 11);
        setTelefone(formatBRPhone(limited));
    };

    const [dataInicio, setDataInicio] = useState(() => {
        const hoje = new Date();
        return hoje.toISOString().split('T')[0];
    });

    return (
        <div className="container-fluid p-4">

            <Accordion defaultActiveKey="0" className='mb-4'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Contratos</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Card>
                <Card.Header>Contrato: </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nome do Contratante:</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Endereço:</Form.Label>
                            <Form.Control type="text" lg={3} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Número:</Form.Label>
                            <Form.Control type="text" />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Bairro:</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="telefoneManual">
                            <Form.Label>Telefone:</Form.Label>
                            <Form.Control
                                type="text"
                                value={telefone}
                                onChange={handleChange}
                                placeholder="(99) 99999-9999"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="dataInicio">
                            <Form.Label>Data Início</Form.Label>
                            <Form.Control
                                type="date"
                                value={dataInicio}
                                onChange={(e) => setDataInicio(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="horaInicio">
                            <Form.Label>Hora Início</Form.Label>
                            <Form.Control
                                type="time"
                                value={horaInicio}
                                onChange={(e) => setHoraInicio(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>
                                <h4>Brinquedos Selecionados</h4>
                                <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
                                    Adicionar Brinquedo
                                </Button>

                                <Table striped bordered>
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Tempo de Uso (min)</th>
                                            <th>Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selecionados.length === 0 ? (
                                            <tr>
                                                <td colSpan="3" className="text-center text-muted">
                                                    Nenhum produto selecionado
                                                </td>
                                            </tr>
                                        ) : (
                                            selecionados.map((p) => (
                                                <tr key={p.id}>
                                                    <td>{p.nome}</td>
                                                    <td>
                                                        <InputGroup size="sm">
                                                            <Form.Control
                                                                type="number"
                                                                placeholder="Minutos"
                                                                value={p.tempoUso}
                                                                onChange={(e) => atualizarTempo(p.id, e.target.value)}
                                                            />
                                                        </InputGroup>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => removerProduto(p.id)}
                                                        >
                                                            Remover
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </Table>



                                {/* Modal com a lista de produtos */}
                                <Modal
                                    show={showModal}
                                    onHide={() => setShowModal(false)}
                                    size="lg"
                                    centered
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Selecionar Produtos</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {carregando ? (
                                            <div className="text-center p-3">
                                                <Spinner animation="border" />
                                                <div>Carregando produtos...</div>
                                            </div>
                                        ) : (
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>Foto</th>
                                                        <th>Nome</th>
                                                        <th>Valor Minuto</th>
                                                        {/* <th>Estoque</th> */}
                                                        <th>Ação</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {produtos.map((produto) => (
                                                        <tr key={produto.id}>
                                                            <td><img
                                                                src={produto.fotoProduto ? `/imagens/produtos/${produto.fotoProduto}` : "/imagens/produtos/placeholder.png"} //REMOVER O LOCALHOST
                                                                alt="Foto do Produto"
                                                                style={{
                                                                    width: "80px",
                                                                    height: "80px",
                                                                    objectFit: "contain",
                                                                    borderRadius: 10,
                                                                    cursor: "pointer",
                                                                    border: "2px solid #ccc",
                                                                }}
                                                            /></td>
                                                            <td>{produto.nome}</td>
                                                            <td>R$ {produto.precoVenda.toFixed(2)}</td>
                                                            {/* <td>{produto.quantidadeEstoque}</td> */}
                                                            <td>
                                                                <Button
                                                                    variant="success"
                                                                    size="sm"
                                                                    onClick={() => adicionarProduto(produto)}
                                                                >
                                                                    Adicionar
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        )}
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                                            Fechar
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Form.Label>
                        </Form.Group>


                    </Form>
                </Card.Body>
                <Card.Footer>
                    <div className='d-flex justify-content-end'>
                        <Button variant="success" onClick={enviar}>
                            Salvar Contrato
                        </Button>
                    </div>
                </Card.Footer>
            </Card>
        </div>
    );
};

function formatBRPhone(value = "") {
    const digits = value.replace(/\D/g, "");
    if (digits.length === 0) return "";

    // DDD
    const ddd = digits.substring(0, 2);
    const rest = digits.substring(2);

    if (rest.length > 8) {
        // celular 9 dígitos: (99) 9xxxx-xxxx
        const part1 = rest.substring(0, 5);
        const part2 = rest.substring(5, 9);
        return `(${ddd}) ${part1}${part2 ? "-" + part2 : ""}`;
    } else {
        // fixo 8 dígitos: (99) xxxx-xxxx
        const part1 = rest.substring(0, 4);
        const part2 = rest.substring(4, 8);
        return `(${ddd}) ${part1}${part2 ? "-" + part2 : ""}`;
    }
}

export default FormContrato;