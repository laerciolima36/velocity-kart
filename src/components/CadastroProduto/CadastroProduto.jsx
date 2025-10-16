import React, { useEffect, useState, useRef } from "react";
import {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  deletarProduto,
  uploadFotoProduto,
} from "./ProdutoService";
import { Card, Button, Form, Modal, Table, Alert, Row, Col } from "react-bootstrap";
import Menu from "../Menu/Menu";
import { FaDatabase } from "react-icons/fa6";
import Load from "../Load/Load";

export default function CadastroProduto() {
  const [produtos, setProdutos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [produtoAtual, setProdutoAtual] = useState({ nome: "", quantidadeEstoque: 1 });
  const [editando, setEditando] = useState(false);
  const [editandoFoto, setEditandoFoto] = useState(false);
  const [foto, setFoto] = useState(null);
  const [erro, setErro] = useState(null);
  const formRef = useRef();
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(false);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const lista = await listarProdutos();
      setProdutos(lista);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErro(error);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleSalvar = async () => {

    if (formRef.current && !formRef.current.checkValidity()) {
      formRef.current.reportValidity(); // mostra os erros nativos do navegador
      return;
    }

    try {
      setLoading(true);
      let produtoSalvo;
      if (editando) {
        produtoSalvo = await atualizarProduto(produtoAtual.id, produtoAtual);
      } else {
        produtoSalvo = await criarProduto(produtoAtual);
      }

      if (foto && produtoSalvo.id) {
        await uploadFotoProduto(produtoSalvo.id, foto);
      }

      carregarProdutos();
      setShowModal(false);
      setProdutoAtual({ nome: "" });
      setFoto(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErro(error);
    }
  };

  const handleEditar = (produto) => {
    setProdutoAtual(produto);
    //setFoto(null);
    setEditando(true);
    setEditandoFoto(true);
    setShowModal(true);
  };

  const handleDeletar = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        setLoading(true);
        await deletarProduto(id);
        carregarProdutos();
        setLoading(false);
      } catch (error) {
        setErro(error);
      }
    }
  };

  const handleImagemSelecionada = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      setEditandoFoto(false); // apenas preview
    }
  };

  const formatarParaBRL = (valor) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const produtosFiltrados = produtos.filter((produto) =>
    produto.codigo?.toLowerCase().includes(filtro.toLowerCase()) ||
    produto.nome?.toLowerCase().includes(filtro.toLowerCase())
  );

  const verificarCodigoExistente = async () => {
    if (!produtoAtual.codigo) return;

    try {
      const jaExiste = produtos.some(
        (p) => p.codigo === produtoAtual.codigo && p.id !== produtoAtual.id
      );

      if (jaExiste) {
        alert("Código já cadastrado para outro produto!");
        setProdutoAtual({ ...produtoAtual, codigo: "" });
        return true;
        // Exemplo: setProdutoAtual({ ...produtoAtual, codigo: "" });
      }
      return false;
    } catch (err) {
      console.error("Erro ao verificar código:", err);
    }
  };

  return (
    <div className="container-fluid">

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

      <Card className='m-4'>
        <Card.Header><FaDatabase style={{ marginRight: "8px" }}/>Cadastro de Brinquedos</Card.Header>
        <Card.Body>
          <Row className="justify-content-between mt-5 mb-3">
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Buscar por nome ou código..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="mb-3"
              />
            </Col>
            <Col md={4} className="text-end">
              <Button type="button" variant="primary" onClick={() => { setShowModal(true); setEditando(false); setProdutoAtual({ nome: "" }); setEditandoFoto(false) }}>Adicionar Novo Brinquedo</Button>
            </Col>
          </Row>

          <Table responsive striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Código</th>
                <th>Foto</th>
                <th>Nome</th>
                <th>Valor em Minutos</th>
                {/* <th>Cor</th> */}
                {/* <th>Tamanho</th> */}
                {/* <th>Categoria</th> */}
                <th>Descrição</th>
                {/* <th>Quantidade</th> */}
                {/* <th>Foto</th> */}
                <th>Opções</th>
                
              </tr>
            </thead>
            <tbody>
              {produtosFiltrados.map((produto) => (
                <tr key={produto.id}>
                  {/* <td>{produto.id}</td> */}
                  <td>{produto.codigo}</td>
                  <td>
                    <img
                      src={produto.fotoProduto ? `/imagens/produtos/${produto.fotoProduto}` : "/imagens/produtos/placeholder.png"} //REMOVER O LOCALHOST
                      alt="Foto do Produto"
                      onClick={() => document.getElementById("fotoInput").click()}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "contain",
                        borderRadius: 10,
                        cursor: "pointer",
                        border: "2px solid #ccc",
                      }}
                    />
                  </td>
                  <td>{produto.nome}</td>
                  {/* <td>{produto.cor}</td> */}
                  {/* <td>{produto.tamanho}</td> */}
                  {/* <td>{produto.categoria}</td> */}
                  {/* <td>R$ {produto.precoCusto.toFixed(2)}</td> */}
                  <td>R$ {produto.precoVenda.toFixed(2)}</td>
                  <td>{produto.descricao}</td>
                  {/* <td>{produto.quantidadeEstoque}</td> */}
                  <td>
                    <Button size="sm" variant="warning" onClick={() => handleEditar(produto)}>Editar</Button>{" "}
                    <Button size="sm" variant="danger" onClick={() => handleDeletar(produto.id)}>Excluir</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal className="modal modal-xl" show={showModal} onHide={() => setShowModal(false)} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>{editando ? "Editar Brinquedo" : "Novo Brinquedo"}<h6>Insira os dados do Brinquedo</h6></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
          <Form ref={formRef}>
            <Row className="justify-content-between mb-3">
              <Col>
                <Row md={3} className="mb-3">
                  <Form.Group>
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      onBlur={verificarCodigoExistente}
                      value={produtoAtual.codigo || ""}
                      onChange={(e) => {
                        const onlyNumbers = e.target.value.replace(/\D/g, ""); // remove tudo que não for dígito
                        setProdutoAtual({ ...produtoAtual, codigo: onlyNumbers });
                      }}
                    />
                  </Form.Group>
                </Row>

                <Row className="justify-content-between mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nome do Brinquedo</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        value={produtoAtual.nome || ""}
                        onChange={(e) => setProdutoAtual({ ...produtoAtual, nome: e.target.value })}
                      />
                    </Form.Group>
                  </Col>

                  {/* <Col md={2}>
                    <Form.Group className="mb-3">
                      <Form.Label>Cor</Form.Label>
                      <Form.Control
                        type="text"
                        value={produtoAtual.cor || ""}
                        onChange={(e) => setProdutoAtual({ ...produtoAtual, cor: e.target.value })}
                      />
                    </Form.Group>
                  </Col> */}

                  {/* <Col md={2}>
                    <Form.Group className="mb-3">
                      <Form.Label>Tamanho</Form.Label>
                      <Form.Control
                        type="text"
                        value={produtoAtual.tamanho || ""}
                        onChange={(e) => setProdutoAtual({ ...produtoAtual, tamanho: e.target.value })}
                      />
                    </Form.Group>
                  </Col> */}
                  {/* <Col md={2}>
                    <Form.Group className="mb-3">
                      <Form.Label>Categoria</Form.Label>
                      <Form.Control
                        type="text"
                        value={produtoAtual.categoria || ""}
                        onChange={(e) => setProdutoAtual({ ...produtoAtual, categoria: e.target.value })}
                      />
                    </Form.Group>
                  </Col> */}
                </Row>

                <Row className="justify-content-between mb-3">
                  {/* <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Quantidade em Estoque</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        value={produtoAtual.quantidadeEstoque || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            setProdutoAtual({
                              ...produtoAtual,
                              quantidadeEstoque: value, // mantém como string
                            });
                          }
                        }}
                      />
                    </Form.Group>
                  </Col> */}

                  {/* <Col md={3}>
                    <Form.Group className="mb-3" >
                      <Form.Label visuallyHidden>Preço de Custo</Form.Label>
                      <Form.Control
                        visuallyHidden
                        type="text"
                        required
                        value={formatarParaBRL(produtoAtual.precoCusto || 0)}
                        onChange={(e) => {
                          const apenasNumeros = e.target.value.replace(/[^\d]/g, "");
                          const valor = parseFloat(apenasNumeros) / 100;

                          setProdutoAtual({
                            ...produtoAtual,
                            precoCusto: valor,
                          });
                        }}
                      />
                    </Form.Group>
                  </Col> */}

                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Valor do Minuto</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        value={formatarParaBRL(produtoAtual.precoVenda || 0)}
                        onChange={(e) => {
                          const apenasNumeros = e.target.value.replace(/[^\d]/g, "");
                          const valor = parseFloat(apenasNumeros) / 100;

                          setProdutoAtual({
                            ...produtoAtual,
                            precoVenda: valor,
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>

              <Col md={3} className="mt-3">

                <div style={{ position: "relative", width: 250, height: 250 }}>
                  <input
                    type="file"
                    id="fotoInput"
                    style={{ display: "none" }}
                    onChange={handleImagemSelecionada}
                    accept="image/*"
                  />

                  <img
                    src={editandoFoto ? `/imagens/produtos/${produtoAtual.fotoProduto}` : foto ? URL.createObjectURL(foto) : "/imagens/produtos/placeholder.png"}
                    alt="Foto do Produto"
                    onClick={() => document.getElementById("fotoInput").click()}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: 10,
                      cursor: "pointer",
                      border: "2px solid #ccc",
                    }}
                  />

                  <div
                    onClick={() => document.getElementById("fotoInput").click()}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0,0,0,0.4)",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.3s",
                      borderRadius: 10,
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                  >
                    Alterar Foto
                  </div>
                </div>

              </Col>
            </Row>


            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={produtoAtual.descricao || ""}
                onChange={(e) => setProdutoAtual({ ...produtoAtual, descricao: e.target.value })}
              />
            </Form.Group>

          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleSalvar}>Salvar</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}