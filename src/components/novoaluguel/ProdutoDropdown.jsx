import React, { useState } from "react";
import { Dropdown, Image, Row, Col } from "react-bootstrap";
import { FaCircle } from "react-icons/fa6";


function ProdutoDropdown({ informacoes, onSelect }) {

    const [selecionado, setSelecionado] = useState(null);

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle style={{ backgroundColor: "violet", color: "black", width: "100%", alignContent: "center" }} id="dropdown-produtos">
                    {selecionado ? selecionado : "Selecione um produto"}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ maxHeight: "300px", overflowY: "auto", width: "88vw", maxWidth: "470px", minWidth: "250px" }}>
                    {informacoes && informacoes.map((info) => (
                        <Dropdown.Item
                            key={info.id}
                            onClick={() => {
                                onSelect(info.id);
                                setSelecionado(info.nomeProduto);
                            }}
                            className="d-flex align-items-center"
                            // style={{width: "350px"}}
                        >
                            <Row className="d-flex justify-content-between align-items-center ps-2 pe-2" >
                                <Col xs={8} className="bg-info">
                                    {info.nomeProduto} {info.disponivel ? <FaCircle style={{ color: "green" }} /> : <FaCircle style={{ color: "red" }} />}
                                    <div>
                                        Na Fila: {info.quantidadeNaFila}
                                    </div>
                                    <div>
                                        Tempo de Espera: {info.tempoEspera} min
                                    </div>
                                </Col>
                                <Col xs={2} className="bg-warning text-center flex-column">
                                    <img
                                        // src={info.fotoProduto ? `/imagens/produtos/${produto.fotoProduto}` : "/imagens/produtos/placeholder.png"} //REMOVER O LOCALHOST
                                        src={info.fotoProduto} //REMOVER O LOCALHOST
                                        alt={info.nomeProduto}
                                        style={{
                                            width: "70px",
                                            height: "70px",
                                            objectFit: "contain",
                                            borderRadius: 10,
                                            cursor: "pointer",
                                            border: "2px solid #ccc",
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default ProdutoDropdown;