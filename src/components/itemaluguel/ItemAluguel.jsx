// ItemAluguel.jsx
import React, { useState } from 'react';
import { pausarById, retomarById } from './ItemAluguelService';
import './css/style.css';
import CountdownCircle from '../itemaluguel/CountdownCircle';
import { FaPlay, FaPause } from "react-icons/fa";
import { BsPauseCircle, BsPlayCircle } from "react-icons/bs";

const ItemAluguel = ({ aluguel }) => {

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

    // Função para formatar data/hora no formato dd/mm hh:mm
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        // return `${dd}/${mm} ${hh}:${min}`;
        return `${hh}:${min}`;
    };

    return (
        <div className='bg-dark p-3 rounded'>
            <div>

            </div>
            <div className='text-white justify-content-between align-items-center d-flex'>
                👫 {aluguel.nomeResponsavel}
                {aluguel.pausado ?
                        <BsPlayCircle size={24}
                            color="#f6ff00ff"
                            style={{ transition: "transform 0.1s" }}
                            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
                            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
                            onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            onClick={handleTogglePausa} />
                        :
                        <BsPauseCircle size={24}
                            color="#ff00fbff"
                            // role="button"
                            // className="p-2 rounded-circle border bg-light"
                            style={{ transition: "transform 0.1s" }}
                            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
                            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
                            onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            onClick={handleTogglePausa} />}
            </div>
            <div className='text-white'>
                👶 {aluguel.nomeCrianca}
            </div>
            <div className='mt-4 text-center justify-content-center align-items-center d-flex flex-column'>
                <CountdownCircle remainingSeconds={aluguel.tempoRestante} totalSeconds={aluguel.tempoEscolhido * 60} pausado={aluguel.pausado} />
            </div>
            <div className='text-end justify-content-end align-items-end d-flex flex-column mb-4'>
                    
                </div>
                <div className='text-secondary text-center justify-content-center align-items-center d-flex flex-column mb-2' style={{ fontSize: '12px' }}>
                🕑 {formatDateTime(aluguel.inicio)} - {aluguel.tempoEscolhido} min
            </div>
            <div className='text-secondary text-center justify-content-center align-items-center d-flex flex-column' style={{ fontSize: '12px' }}>
                🚗 {aluguel.produto.nome} 💰 {aluguel.pago ? "Pago" : "Falta Pagar"}
            </div>

            {/* <div className='bg-secondary text-white text-center justify-content-center align-items-center d-flex flex-column p-2 rounded'>
                {aluguel.pausado ? <FaPlay /> : <FaPause />}
                {aluguel.pausado ? 'Retomar' : 'Pausar'}
            </div> */}
            {/* <Card className="text-center">
                <Card.Header>{aluguel.nomeResponsavel}</Card.Header>
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
            </Card> */}
        </div>
    );
};

export default ItemAluguel;