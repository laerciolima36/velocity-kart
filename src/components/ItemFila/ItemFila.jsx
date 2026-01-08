// ItemAluguel.jsx
import React, { useState } from 'react';
import { pausarById, retomarById, setFlagFalse, cancelarAluguel, reproduzirAudioFinal } from '../itemaluguel/ItemAluguelService';
import './css/style.css';
import CountdownCircle from '../itemaluguel/CountdownCircle';
import { FaPlay, FaPause } from "react-icons/fa";
import { BsPauseCircle, BsPlayCircle } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { Button, Modal } from 'react-bootstrap';


const ItemFila = ({ aluguel, carregarAlugueisFinalizados }) => {

    const isLoggedIn = !!localStorage.getItem("jwtToken");

    const [showConfirm, setShowConfirm] = useState(false);

    const handleCancelar = () => {
        setShowConfirm(true);
    };

    const confirmarCancelamento = () => {
        cancelarAluguel(aluguel.id);
        setShowConfirm(false);
    };

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

    const handleTogglePlayAudio = () => {
        reproduzirAudioFinal(aluguel.id);
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
        <div className='rounded border-top border-2 border-info mb-2'>
            <div className='bg-dark text-white justify-content-between align-items-center d-flex mt-2 p-2'>
                <div className='d-flex flex-column ms-2' style={{ fontSize: '13px' }}>
                    <span className='mb-2'>
                        👶 {aluguel.nomeCrianca}
                    </span>
                    <span className='mb-2'>
                        🚗 {aluguel.produto.nome}
                    </span>
                    <span className='mb-2'>
                        👫 {aluguel.nomeResponsavel}
                    </span>
                    {isLoggedIn &&
                        <span className='mb-2'>
                            💰 {aluguel.pago ? "Pago" : "Falta Pagar"}
                        </span>
                    }
                </div>
                <div className='text-center justify-content-center align-items-center d-flex flex-column'>
                    {/* <CountdownCircle remainingSeconds={aluguel.tempoRestante} totalSeconds={aluguel.tempoEscolhido * 60} pausado={aluguel.pausado} flagView={aluguel.flagView} /> */}
                    <div className='border border-2 border-warning rounded-circle d-flex justify-content-center align-items-center' style={{ width: '60px', height: '60px', borderColor: 'yellow', fontSize: '12px' }}>{aluguel.tempoEscolhido} min</div>
                </div>
                <div className='text-white justify-content-between align-items-center d-flex '>
                    {aluguel.flagView ? (
                        <div>
                            <BsPlayCircle size={38}
                                color="#f6ff00ff"
                                style={{ transition: "transform 0.1s", marginRight: 10 }}
                                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
                                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
                                onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                onClick={handleTogglePlayAudio} />
                            <IoIosCloseCircle
                                size={38}
                                color="#ff0000ff"
                                style={{ transition: "transform 0.1s" }}
                                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
                                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
                                onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                title="Aluguel finalizado"
                                onClick={handleSetFlagView}
                            />
                        </div>
                    ) :
                        aluguel.pausado ?
                            <BsPlayCircle size={38}
                                color="#f6ff00ff"
                                style={{ transition: "transform 0.1s" }}
                                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
                                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
                                onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                onClick={handleTogglePausa} />
                            :
                            <BsPauseCircle size={38}
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
            </div>
            <div className='text-end justify-content-end align-items-end d-flex flex-column mb-4'>
                {isLoggedIn &&
                    <div className='mt-4 text-secondary text-center justify-content-center align-items-center d-flex flex-column' style={{ fontSize: '12px' }}>
                        <Button id={aluguel.id} variant='danger' size='sm' onClick={handleCancelar}>Cancelar</Button>
                    </div>
                }
            </div>
            {/* <div className='text-secondary text-center justify-content-center align-items-center d-flex flex-column mb-2' style={{ fontSize: '12px' }}>
                🕑 {formatDateTime(aluguel.inicio)} - {aluguel.tempoEscolhido} min
            </div> */}
            {/* <div className='text-secondary text-center justify-content-center align-items-center d-flex flex-column' style={{ fontSize: '12px' }}>
                🚗 {aluguel.produto.nome}
            </div> */}



            <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar cancelamento de {aluguel.nomeResponsavel}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja cancelar este aluguel?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                        Não
                    </Button>
                    <Button variant="danger" onClick={confirmarCancelamento}>
                        Sim, cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ItemFila;