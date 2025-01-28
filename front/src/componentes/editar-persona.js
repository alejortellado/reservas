import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import BackService from '../services/backService';


const EditarPersona = () => {
    const [persona, setPersona] = useState({
        nombrecompleto: '',
        nrodocumento: '',
        correo: '',
        telefono: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setPersona(location.state);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersona((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const editarPersona = (e) => {
        e.preventDefault();
        BackService.editarPersona(id, JSON.stringify(persona)).then(() => {
            cancelar();
        });
    };

    const cancelar = () => {
        navigate('../personas');
    };

    return (
        <div style={{ margin: '25px 15px' }}>
            <h2>Editar Persona</h2>

            <form onSubmit={editarPersona}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="nombrecompleto">Nombre Completo</label>
                            <input
                                id="nombrecompleto"
                                name="nombrecompleto"
                                type="text"
                                className="form-control"
                                value={persona.nombrecompleto}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="nrodocumento">Nro Documento</label>
                            <input
                                id="nrodocumento"
                                name="nrodocumento"
                                type="text"
                                className="form-control"
                                value={persona.nrodocumento}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="telefono">Teléfono</label>
                            <input
                                id="telefono"
                                name="telefono"
                                type="text"
                                className="form-control"
                                value={persona.telefono}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="correo">Correo</label>
                            <input
                                id="correo"
                                name="correo"
                                type="email"
                                className="form-control"
                                value={persona.correo}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div style={{ textAlign: 'end' }}>
                        <button className="btn btn-success" type="submit">Editar</button>
                        <button
                            className="btn btn-danger"
                            type="button"
                            style={{ marginLeft: '5px' }}
                            onClick={cancelar}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditarPersona;
