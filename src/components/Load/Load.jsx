import React from 'react';
import Spinner from 'react-bootstrap/Spinner'
import logo from '../../assets/logowhite.png'; // Certifique-se de que o caminho está correto

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(47, 47, 47, 1)', // cinza com transparência
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
};

const Load = () => (
    <div style={overlayStyle}>
        <div style={{ position: 'relative', width: '15rem', height: '15rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Spinner
                animation="border"
                style={{
                    width: '15rem',
                    height: '15rem',
                    color: "#a600c0ff",
                    borderWidth: '3px'
                }}
            />
            <img
                src={logo}
                alt="Logo"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '14rem',
                    contains: 'fit',
                }}
            />
        </div>
    </div>
);

export default Load;