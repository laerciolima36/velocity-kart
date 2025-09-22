import React from 'react';
import Menu from '../components/Menu/Menu';
import ItemAluguel from '../components/ItemAluguel/ItemAluguel';
import NovoAluguel from '../components/novoaluguel/NovoAluguel';

const Aluguel = () => {
    return (
        <div>
            <Menu />
            <h1>Aluguel Page</h1>
            <ItemAluguel nome={"carlos"} />
            <NovoAluguel />
           
        </div>
    );
};

export default Aluguel;