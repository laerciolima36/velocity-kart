import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button, Table, Accordion, Modal, OverlayTrigger, Tooltip as BootstrapTooltip, Spinner } from "react-bootstrap";
import { buscarPorPeriodo, deletarVenda } from "./VendaService";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Load from '../Load/Load';
import { FaChartLine } from 'react-icons/fa6';

// Registrar os componentes do ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RelatorioVendas = () => {

    const [erro, setErro] = useState(null); // usado para exibir erros na busca de vendas
    const [vendaSelecionada, setVendaSelecionada] = useState(null); //usado para detalhar a venda no modal
    const [showModal, setShowModal] = useState(false); // usado para controlar a exibição do modal de detalhes da venda
    const [load, setLoad] = useState(false); // usado para mostrar o spinner de carregamento
    const [showContent, setShowContent] = useState(false); // usado para mostrar o conteúdo após a busca

    // Função para abrir o modal com os detalhes da venda
    // Essa função recebe a venda selecionada e exibe o modal com os detalhes dessa venda
    const handleOpenModal = (venda) => {
        setVendaSelecionada(venda);
        setShowModal(true);
    };

    // Função para fechar o modal
    // Essa função é chamada quando o modal é fechado, limpando a venda selecionada
    const handleCloseModal = () => {
        setShowModal(false);
        setVendaSelecionada(null);
    };

    // Estados para armazenar as datas de início e fim do período selecionado
    const [dataInicio, setDataInicio] = useState(() => {
        const hoje = new Date();
        return hoje.toISOString().split('T')[0];
    });

    // Estado para armazenar a data de fim do período selecionado
    const [dataFim, setDataFim] = useState(() => {
        const hoje = new Date();
        return hoje.toISOString().split('T')[0];
    });

    const handleDeletar = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este aluguel?")) {
            try {
                setLoad(true);
                await deletarVenda(id);
                buscarVendas();
                setLoad(false);
            } catch (error) {
                setErro(error);
            }
        }
    };


    const [vendas, setVendas] = useState([]); // Estado para armazenar as vendas trazidas pela API
    const [filtroAtendente, setFiltroAtendente] = useState(''); // Estado para armazenar o filtro de atendente
    const [filtroFormaPagamento, setFiltroFormaPagamento] = useState(''); // Estado para armazenar o filtro de forma de pagamento

    // Função para buscar as vendas no período selecionado
    // Essa função é chamada quando o usuário clica no botão "Buscar"
    // Ela verifica se as datas de início e fim estão preenchidas, chama a API para buscar as vendas e atualiza o estado com os dados retornados
    const buscarVendas = async () => {
        if (!dataInicio || !dataFim) {
            alert('Por favor, selecione o período.');
            return;
        }
        try {
            setLoad(true);
            const vendas = await buscarPorPeriodo(dataInicio, dataFim);
            setVendas(vendas);
            setLoad(false);
            setShowContent(true);
        } catch (error) {
            setErro(error);
            setLoad(false);
        }
    };

    // Função para limpar os filtros aplicados
    const limparFiltros = () => {
        setFiltroAtendente('');
        setFiltroFormaPagamento('');
    };

    //Filtro para as vendas
    // Essa função filtra as vendas com base no atendente e na forma de pagamento selecionados
    // Ela utiliza o método filter para criar um novo array de vendas que atendem aos critérios de filtro
    // O filtro é aplicado antes de calcular os produtos mais vendidos e os totais de vendas e lucro
    const vendasFiltradas = vendas.filter((venda) => {
        const atendenteMatch = venda.atendente?.toLowerCase().includes(filtroAtendente.toLowerCase());
        const formaPagamentoMatch = venda.formaPagamento?.toLowerCase().includes(filtroFormaPagamento.toLowerCase());
        return atendenteMatch && formaPagamentoMatch;
    });

    // Função para contar os produtos mais vendidos
    const contarProdutosMaisVendidos = () => {
        const contagemProdutos = {};

        vendasFiltradas.forEach(venda => {
            venda.itens.forEach(item => {
                const produtoNome = item.produto.nome;
                if (contagemProdutos[produtoNome]) {
                    contagemProdutos[produtoNome] += item.quantidade;
                } else {
                    contagemProdutos[produtoNome] = item.quantidade;
                }
            });
        });

        // Ordena os produtos pela quantidade
        const produtosOrdenados = Object.entries(contagemProdutos)
            .map(([nome, quantidade]) => ({ nome, quantidade }))
            .sort((a, b) => b.quantidade - a.quantidade);

        return produtosOrdenados;
    };

    // Contar os produtos mais vendidos
    const produtosMaisVendidos = contarProdutosMaisVendidos();

    // Calcular o total de vendas e lucro no período
    // Essa parte do código calcula o total de vendas e lucro no período filtrado
    // Utiliza o método reduce para somar os valores de cada venda filtrada
    // O total de vendas é a soma dos valores totais de cada venda, e o lucro é calculado subtraindo o custo dos produtos vendidos do preço de venda, considerando também os descontos aplicados
    // O resultado é um objeto com o total de vendas e lucro, que será usado para exibir os resultados no relatório
    const totalVendasPeriodo = vendasFiltradas.reduce((total, venda) => total + parseFloat(venda.valorTotal), 0);

    const resultadoLucro = vendasFiltradas.reduce((acumulador, venda) => {
        const lucroItens = venda.itens.reduce((lucroVenda, item) => {
            const precoVenda = item.produto.precoVenda || 0;
            const precoCusto = item.produto.precoCusto || 0;
            return lucroVenda + (precoVenda - precoCusto);
        }, 0);

        const desconto = venda.desconto || 0;
        const lucroFinalVenda = lucroItens - desconto;

        return {
            lucro: acumulador.lucro + lucroFinalVenda,
            desconto: acumulador.desconto + desconto,
        };
    }, { lucro: 0, desconto: 0 });

    const vendasPorDia = vendasFiltradas.reduce((acc, venda) => {
        const dia = new Date(venda.dataVenda).toLocaleDateString('pt-BR');
        if (!acc[dia]) {
            acc[dia] = 0;
        }
        acc[dia] += parseFloat(venda.valorTotal);
        return acc;
    }, {});

    const lucroPorDia = vendasFiltradas.reduce((acc, venda) => {
        const dia = new Date(venda.dataVenda).toLocaleDateString('pt-BR');

        const lucroItens = venda.itens.reduce((lucroVenda, item) => {
            const precoVenda = item.produto.precoVenda || 0;
            const precoCusto = item.produto.precoCusto || 0;
            return lucroVenda + (precoVenda - precoCusto);
        }, 0);

        const desconto = venda.desconto || 0;
        const lucroFinalVenda = lucroItens - desconto;

        if (!acc[dia]) {
            acc[dia] = 0;
        }
        acc[dia] += lucroFinalVenda;

        return acc;
    }, {});

    const dias = Object.keys(vendasPorDia);
    const valoresVendas = dias.map((dia) => vendasPorDia[dia]);
    const valoresLucro = dias.map((dia) => lucroPorDia[dia] || 0);

    const dataGraficoCombinado = {
        labels: dias,
        datasets: [
            {
                label: 'Valor de Aluguéis por Dia',
                data: valoresVendas,
                backgroundColor: 'rgba(14, 124, 31, 0.7)', // azul mais suave
                borderRadius: 10,
            },
            // {
            //     label: 'Lucro por Dia',
            //     data: valoresLucro,
            //     backgroundColor: 'rgba(14, 124, 31, 0.7)', // verde água
            //     borderRadius: 10,
            // }
        ]
    };

    const optionsGrafico = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14,
                        family: 'Arial, sans-serif',
                        weight: 'bold'
                    },
                    color: '#333'
                }
            },
            title: {
                display: true,
                text: 'Gráfico de Aluguéis por Dia',
                font: {
                    size: 20,
                    family: 'Arial, sans-serif',
                    weight: 'bold'
                },
                color: '#222'
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleFont: {
                    size: 16,
                },
                bodyFont: {
                    size: 14,
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 12,
                    },
                    color: '#555'
                },
                grid: {
                    color: 'rgba(0,0,0,0.05)'
                }
            },
            y: {
                ticks: {
                    font: {
                        size: 12,
                    },
                    color: '#555'
                },
                grid: {
                    color: 'rgba(0,0,0,0.05)'
                }
            }
        },
        animation: {
            duration: 1500,
            easing: 'easeOutBounce'
        }
    };

    function formatarTempo(minutosTotais) {
        const horas = Math.floor(minutosTotais / 60);
        const minutos = minutosTotais % 60;

        if (horas > 0 && minutos > 0) {
            return `${horas} hora${horas > 1 ? 's' : ''} e ${minutos} minuto${minutos > 1 ? 's' : ''}`;
        } else if (horas > 0) {
            return `${horas} hora${horas > 1 ? 's' : ''}`;
        } else {
            return `${minutos} minuto${minutos > 1 ? 's' : ''}`;
        }
    }

    return (
        <div className="container-fluid">

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

            <Card className='mt-4'>
                <Card.Header><FaChartLine style={{ marginRight: "8px" }} />Relatório de Aluguéis</Card.Header>
                <Card.Body>
                    {/* <Card.Title>Special title treatment</Card.Title> */}
                    <Card.Text>
                        Escolha o Período:                    </Card.Text>

                    <Row className='justify-content-center align-items-center mt-4'>
                        <Col md={2}>
                            <Form.Group className="mb-3" controlId="dataInicio">
                                <Form.Label>Data Início</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={dataInicio}
                                    onChange={(e) => setDataInicio(e.target.value)}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={2}>
                            <Form.Group className="mb-3" controlId="dataFim">
                                <Form.Label>Data Fim</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={dataFim}
                                    onChange={(e) => setDataFim(e.target.value)}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={2} className="m-4">
                            <Button variant="primary" onClick={buscarVendas}>
                                Buscar
                            </Button>
                        </Col>



                        <Col md={2}>
                            <Button variant="secondary" onClick={limparFiltros}>
                                Limpar Filtros
                            </Button>
                        </Col>
                    </Row>

                    <Row className="justify-content-center align-items-center mt-3">
                        <Col md={3}>
                            <Form.Group className="mb-3" controlId="filtroFormaPagamento">
                                <Form.Label>Filtrar por Forma de Pagamento</Form.Label>
                                <Form.Select
                                    value={filtroFormaPagamento}
                                    onChange={(e) => setFiltroFormaPagamento(e.target.value)}
                                >
                                    <option value={""}>Todas</option>
                                    <option>Pix</option>
                                    <option>Cartao de Crédito</option>
                                    <option>Cartao de Débito</option>
                                    {/* <option>Dinheiro</option> */}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3" controlId="filtroAtendente">
                                <Form.Label>Filtrar por Atendente</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Digite o nome do atendente"
                                    value={filtroAtendente}
                                    onChange={(e) => setFiltroAtendente(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {load ? (
                        <Load />

                    ) : showContent ? (

                        <div>
                            <Row className="mt-3">
                                <Row className="mt-2 justify-content-center">
                                    <Col md={3}>
                                        <Card bg='success' text='white' className='mb-3'>
                                            <Card.Body>
                                                <Card.Title>Total de Aluguéis no Período:</Card.Title>
                                                <Card.Text className='d-flex justify-content-end' style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                                                    R$ {totalVendasPeriodo.toFixed(2)}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>

                                    </Col>
                                    {/* <Col md={3}>
                                        <Card bg='success' text='white'>
                                            <Card.Body>
                                                <Card.Title>Total de Lucro no Período:</Card.Title>
                                                <Card.Text className='d-flex justify-content-end' style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                                                    R$ {resultadoLucro.lucro.toFixed(2)}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col> */}
                                    {/* <Col md={3}>
                                <div className="card p-3">
                                    <p className="day-text">Total de Desconto no Período:</p>
                                    <p className="time-text text-end"><span>R$ {resultadoLucro.desconto.toFixed(2)}</span></p>
                                </div>
                            </Col> */}
                                </Row>
                            </Row>

                            {/* Gráfico bonito */}
                            <Row className="m-5">
                                <Col>
                                    <Bar
                                        data={dataGraficoCombinado}
                                        options={optionsGrafico}
                                    />
                                </Col>
                            </Row>

                            {/* Tabela de vendas */}
                            <Accordion defaultActiveKey="0" className='m-5'>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Aluguéis no Período</Accordion.Header>
                                    <Accordion.Body>
                                        <Table responsive striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Data</th>
                                                    <th>Atendente</th>
                                                    <th>Subtotal</th>
                                                    {/* <th>Desconto</th> */}
                                                    <th>Total</th>
                                                    <th>Forma Pagamento</th>
                                                    <th>Detalhes</th>
                                                    <th>Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {vendasFiltradas.map((venda) => (
                                                    <tr key={venda.id}>
                                                        <td>{`${new Date(venda.dataVenda).toLocaleDateString('pt-BR')} ${new Date(venda.dataVenda).toLocaleTimeString('pt-BR')}`}</td>
                                                        <td>{venda.atendente}</td>
                                                        <td>R$ {venda.subTotal?.toFixed(2)}</td>
                                                        {/* <td>R$ {venda.desconto?.toFixed(2)}</td> */}
                                                        <td>R$ {venda.valorTotal?.toFixed(2)}</td>
                                                        <td>{venda.formaPagamento}</td>
                                                        <td>
                                                            {/* <OverlayTrigger
                                                                placement="top"
                                                                overlay={
                                                                    <BootstrapTooltip id={`tooltip-${venda.id}`}>
                                                                        {venda.desconto > 0 ? "Venda com Desconto" : "Venda sem Desconto"}
                                                                    </BootstrapTooltip>
                                                                }
                                                            > */}
                                                            <Button
                                                                size="sm"
                                                                variant={venda.desconto > 0 ? "warning" : "info"}
                                                                onClick={() => handleOpenModal(venda)}
                                                            >
                                                                Ver detalhes
                                                            </Button>
                                                            {/* </OverlayTrigger> */}
                                                        </td>
                                                        <td>
                                                            <Button size="sm" variant="danger" onClick={() => handleDeletar(venda.id)}>Excluir</Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>

                            {/* Tabela de produtos mais vendidos */}
                            <Accordion defaultActiveKey="1" className='m-5'>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Brinquedos Mais Alugados</Accordion.Header>
                                    <Accordion.Body>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Brinquedo</th>
                                                    <th>Tempo Total no Período</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {produtosMaisVendidos.length > 0 ? produtosMaisVendidos.map((produto) => (
                                                    <tr key={produto.nome}>
                                                        <td>{produto.nome}</td>
                                                        <td>{formatarTempo(produto.quantidade)}</td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td colSpan="2" className="text-center">Nenhum Brinquedo alugado no período.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>) : ""
                    }
                </Card.Body>
            </Card>
            {/* Modal de detalhes */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Detalhes do Aluguel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {vendaSelecionada && (
                        <>
                            {/* Informações gerais da venda */}
                            <Row className="mb-4">
                                <Col md={6}>
                                    <p><strong>Data:</strong> {`${new Date(vendaSelecionada.dataVenda).toLocaleDateString('pt-BR')} ${new Date(vendaSelecionada.dataVenda).toLocaleTimeString('pt-BR')}`}</p>
                                    <p><strong>Atendente:</strong> {vendaSelecionada.atendente}</p>
                                    <p><strong>Forma de Pagamento:</strong> {vendaSelecionada.formaPagamento}</p>
                                </Col>
                                <Col md={6}>
                                    {/* <p><strong>Subtotal:</strong> R$ {vendaSelecionada.subTotal?.toFixed(2)}</p>
                                    <p><strong>Desconto:</strong> R$ {vendaSelecionada.desconto?.toFixed(2)}</p> */}
                                    <p><strong>Total:</strong> <strong>R$ {vendaSelecionada.valorTotal?.toFixed(2)}</strong></p>
                                </Col>
                            </Row>

                            {/* Itens da venda */}
                            <h5>Brinquedo</h5>
                            <Table size="sm" bordered hover>
                                <thead>
                                    <tr>
                                        <th>Brinquedo</th>
                                        <th>Tempo Escolhido</th>
                                        <th>Valor do Minuto</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vendaSelecionada.itens.map((item, idx) => (
                                        <tr key={idx}>
                                            <td>{item.produto.nome}</td>
                                            <td>{item.quantidade}</td>
                                            <td>R$ {item.produto.precoVenda?.toFixed(2)}</td>
                                            <td>R$ {(item.produto.precoVenda * item.quantidade)?.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                    {/* Linha de subtotal dos itens */}
                                    {/* <tr>
                                        <td colSpan="3" className="text-end"><strong>Subtotal dos Itens:</strong></td>
                                        <td><strong>R$ {vendaSelecionada.subTotal?.toFixed(2)}</strong></td>
                                    </tr> */}
                                    {/* Linha de desconto */}
                                    {/* <tr>
                                        <td colSpan="3" className="text-end"><strong>Desconto:</strong></td>
                                        <td><strong>- R$ {vendaSelecionada.desconto?.toFixed(2)}</strong></td>
                                    </tr> */}
                                    {/* Linha de total final */}
                                    {/* <tr>
                                        <td colSpan="3" className="text-end"><strong>Total Final:</strong></td>
                                        <td><strong>R$ {vendaSelecionada.valorTotal?.toFixed(2)}</strong></td>
                                    </tr> */}
                                </tbody>
                            </Table>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
};

export default RelatorioVendas;