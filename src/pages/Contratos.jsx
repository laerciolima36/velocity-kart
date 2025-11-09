import React from 'react';
import Menu from '../components/Menu/Menu';
import FormContrato from '../components/FormContrato/FormContrato';
import ListaContratos from '../components/ListaContratos/ListaContratos';

const Contratos = () => {
    return (
        <div>
            <Menu titulo={"Contratos"} />
            <ListaContratos estado={true} title={"Contratos Ativos"}/> // Contratos ativos
            <FormContrato />
            <ListaContratos estado={false} title={"Contratos Finalizados"}/> // Contratos finalizados
        </div>
    );
};

export default Contratos;