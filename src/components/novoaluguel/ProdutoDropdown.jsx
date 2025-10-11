import React, { useState } from "react";
import { Dropdown, Image } from "react-bootstrap";

function ProdutoDropdown({ produtos, onSelect }) {

    const [selecionado, setSelecionado] = useState(null);

return (
    <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-produtos">
            {selecionado ? selecionado : "Selecione um produto"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
            {produtos.map((produto) => (
                <Dropdown.Item
                    key={produto.id}
                    onClick={() => {
                        onSelect(produto.id);
                        setSelecionado(produto.nome);
                    }}
                    className="d-flex align-items-center"
                    style={{ minWidth: "85vw" }}
                >
                    <Image
                        src={produto.fotoProduto}
                        alt={produto.nome}
                        rounded
                        style={{ width: "40px", height: "40px", objectFit: "cover", marginRight: "10px" }}
                    />
                    {produto.nome}
                </Dropdown.Item>
            ))}
        </Dropdown.Menu>
    </Dropdown>
);
}

export default ProdutoDropdown;