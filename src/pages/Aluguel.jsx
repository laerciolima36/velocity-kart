import React from 'react';
import { Alert } from 'react-bootstrap';
import Menu from '../components/Menu/Menu';
import ItemAluguel from '../components/ItemAluguel/ItemAluguel';
import NovoAluguel from '../components/novoaluguel/NovoAluguel';
import { useAlugueisContext } from '../store/AlugueisProvider/AlugueisProvider';
import './css/style.css';


const Aluguel = () => {

    const { alugueis = [], error } = useAlugueisContext();

    return (
        <div >
            <Menu />

            {!error && alugueis.length === 0 ? (
                <div style={{ margin: '20px 0', textAlign: 'center' }}>
                    Toque no + para registrar um novo aluguel
                </div>
            ) : (
                alugueis.map((aluguel) => (
                    <ItemAluguel key={aluguel.id} aluguel={aluguel} />
                ))
            )}

            <NovoAluguel />

            {error && (
                <Alert
                    variant="danger"
                    //onClose={() => setErro(null)}
                    dismissible
                    className="custom-alert"
                >
                    Erro: {error}
                </Alert>
            )}
        </div>
    );
};

export default Aluguel;