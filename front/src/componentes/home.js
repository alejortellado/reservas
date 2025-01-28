import React from 'react';
import { useNavigate  } from 'react-router-dom';
import './inicio.css';

const Home = () => {
    const navigate  = useNavigate ();

    const goTo = (direccion) => {
        navigate (`/${direccion}`);
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginTop: '110px' }}>Bienvenido</h1>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '100px' }}>
                <div className="opciones" onClick={() => goTo('habitaciones')}>
                    Habitaciones
                </div>
                <div className="opciones" onClick={() => goTo('reservas')}>
                    Reservas
                </div>
                <div className="opciones" onClick={() => goTo('personas')}>
                    Personas
                </div>
            </div>
        </div>
    );
};

export default Home;
