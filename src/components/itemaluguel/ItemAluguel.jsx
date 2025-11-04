// ItemAluguel.jsx
import React, { useState } from 'react';
import { pausarById, retomarById, setFlagFalse } from './ItemAluguelService';
import './css/style.css';
import CountdownCircle from '../itemaluguel/CountdownCircle';
import { FaPlay, FaPause } from "react-icons/fa";
import { BsPauseCircle, BsPlayCircle } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";


const ItemAluguel = ({ aluguel, carregarAlugueisFinalizados }) => {

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

    const handleSetFlagView = async () => {
        await setFlagFalse(aluguel.id);
        carregarAlugueisFinalizados();
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
                {aluguel.flagView ? (
                    <IoIosCloseCircle
                        size={24}
                        color="#ff0000ff"
                        style={{ transition: "transform 0.1s" }}
                        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
                        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
                        onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        title="Aluguel finalizado"
                        onClick={handleSetFlagView}
                    />
                ) : 
                    aluguel.pausado ?
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
                            onClick={handleTogglePausa} />
                }
            </div>
            <div className='text-white'>
                👶 {aluguel.nomeCrianca}
            </div>
            <div className='mt-4 text-center justify-content-center align-items-center d-flex flex-column'>
                <CountdownCircle remainingSeconds={aluguel.tempoRestante} totalSeconds={aluguel.tempoEscolhido * 60} pausado={aluguel.pausado} flagView={aluguel.flagView}/>
            </div>
            <div className='text-end justify-content-end align-items-end d-flex flex-column mb-4'>

            </div>
            <div className='text-secondary text-center justify-content-center align-items-center d-flex flex-column mb-2' style={{ fontSize: '12px' }}>
                🕑 {formatDateTime(aluguel.inicio)} - {aluguel.tempoEscolhido} min
            </div>
            <div className='text-secondary text-center justify-content-center align-items-center d-flex flex-column' style={{ fontSize: '12px' }}>
                🚗 {aluguel.produto.nome} 💰 {aluguel.pago ? "Pago" : "Falta Pagar"}
            </div>
        </div>
    );
};

export default ItemAluguel;