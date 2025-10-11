// ItemAluguel.jsx
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
// import { pausarById, retomarById } from './ItemAluguelService';





const ItemAluguel = ({ key, aluguel }) => {
    
    const handleTogglePausa = () => {

        if (aluguel.pausado) {
            retomarById(aluguel.id);
            console.log('Retomar');
            console.log(aluguel.id);
        } else {
            console.log('Pausar');
            console.log(aluguel.id);
            pausarById(aluguel.id);
        }

        console.log(aluguel.pausado ? 'Retomar' : 'Pausar');
    };

    return (
        <div className="container-fluid">
            <Card className="text-center m-4">
                <Card.Header>Responsável: {aluguel.nomeResponsavel}</Card.Header>
                <Card.Body>
                    <Card.Title>Criança: {aluguel.nomeCrianca} </Card.Title>
                    <div className="position-absolute top-50 start-0 translate-middle-y">
                        <Image
                            src="https://images.tcdn.com.br/img/img_prod/394779/patinete_eletrico_ninebot_segway_300w_5_2mah_es2_gtsm1_4785_1_580b323516c6a09e00f874191fc0b971_20250701160847.jpg"
                            roundedCircle
                            width={120}
                            height={120}
                        />
                    </div>

                    <p><strong>Brinquedo:</strong> {aluguel.brinquedo}</p>
                    <p><strong>Tempo Escolhido: </strong> {aluguel.tempoEscolhido} minutos</p>

                    <p><strong>Pago: </strong> {aluguel.pago ? "Sim" : "Não"}</p>
                </Card.Body>
                <Card.Footer className="text-muted">
                    Tempo Restante: {Math.floor(aluguel.tempoRestante / 60)} minutos e {aluguel.tempoRestante % 60} segundos
                    <Button
                        key={key}
                        variant="primary"
                        onClick={() => handleTogglePausa()}
                        className="ms-2"
                    >
                        {aluguel.pausado ? 'Retomar' : 'Pausar'}
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default ItemAluguel;