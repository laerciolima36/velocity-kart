import React, { useState } from "react";
import { Dropdown, Image, Row, Col } from "react-bootstrap";
import { FaCircle } from "react-icons/fa6";


function ProdutoDropdown({ informacoes, onSelect }) {

    const [selecionado, setSelecionado] = useState(null);

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle style={{ backgroundColor: "#f8d0f7cc", color: "black", width: "100%", alignContent: "center" }} id="dropdown-produtos">
                    {selecionado ? selecionado : "Selecione um brinquedo"}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ maxHeight: "300px", overflowY: "auto", width: "88vw", maxWidth: "470px", minWidth: "250px" }}>
                    {informacoes && informacoes.map((info, index) => (
                        <Dropdown.Item
                            key={info.produtoId}
                            onClick={() => {
                                onSelect(info.produtoId);
                                setSelecionado(info.nomeProduto);
                            }}
                            className="d-flex justify-content-between"
                            style={index % 2 === 0 ? { backgroundColor: "#f8dffdff" } : {}}
                        >
                            <div className="d-flex justify-content-between ps-2 pe-2" >
                                <div xs={8}>
                                    <strong>{info.nomeProduto}</strong> {info.disponivel ? <FaCircle style={{ color: "green" }} /> : <FaCircle style={{ color: "red" }} />}
                                    <div>
                                        Na Fila: {info.quantidadeNaFila}
                                    </div>
                                    <div>
                                        Tempo de Espera: {info.tempoEspera} min
                                    </div>
                                </div>
                            </div>

                            <div>
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
                            </div>

                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default ProdutoDropdown;