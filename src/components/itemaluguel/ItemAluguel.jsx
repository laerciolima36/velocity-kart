// ItemAluguel.jsx
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';





const ItemAluguel = ({ nome }) => {
    // estados principais
    const [responsavel, setResponsavel] = useState("Renata");
    const [crianca, setCrianca] = useState("Letícia");
    const [brinquedo, setBrinquedo] = useState("Patinete");
    const [tempo, setTempo] = useState(30);
    const [pago, setPago] = useState(true);
    const [tempoRestante, setTempoRestante] = useState(30);



    return (
        <div className="container-fluid">
            <Card className="text-center m-4">
                <Card.Header>Responsável: {nome}</Card.Header>
                <Card.Body>
                    <Card.Title>Criança: {crianca} </Card.Title>
                    <div className="position-absolute top-50 start-0 translate-middle-y">
                        <Image
                            src="https://images.tcdn.com.br/img/img_prod/394779/patinete_eletrico_ninebot_segway_300w_5_2mah_es2_gtsm1_4785_1_580b323516c6a09e00f874191fc0b971_20250701160847.jpg"
                            roundedCircle
                            width={120}
                            height={120}
                        />
                    </div>

                    <p><strong>Brinquedo:</strong> {brinquedo}</p>
                    <p><strong>Tempo Escolhido: </strong> {tempo} minutos</p>

                    <p><strong>Pago: </strong> {pago ? "Sim" : "Não"}</p>
                </Card.Body>
                <Card.Footer className="text-muted">Tempo Restante: {tempoRestante} minutos
                    <Button variant="primary">Pause</Button>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default ItemAluguel;