import React from 'react';
import Menu from '../components/Menu/Menu';
import FormContrato from '../components/FormContrato/FormContrato';

const Contratos = () => {
    return (
        <div>
            <Menu titulo={"Contratos"}/>
            <FormContrato />
        </div>
    );
};

export default Contratos;