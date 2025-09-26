import React from 'react';
import Menu from '../components/Menu/Menu';
import ItemAluguel from '../components/ItemAluguel/ItemAluguel';
import NovoAluguel from '../components/novoaluguel/NovoAluguel';

const Aluguel = () => {
    return (
        <div>
            <Menu />
            <ItemAluguel nome={"carlos"} />
            <NovoAluguel />
        </div>
    );
};

export default Aluguel;