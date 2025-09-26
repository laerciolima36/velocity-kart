import React from 'react';
import Menu from '../components/Menu/Menu';
import FormContrato from '../components/FormContrato/FormContrato';
import RelatorioVendas from '../components/RelatorioVendas/RelatorioVendas';

const Relatorio = () => {
    return (
        <div>
            <Menu />
            <RelatorioVendas />
        </div>
    );
};

export default Relatorio;