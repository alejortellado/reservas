import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import BackService from '../services/backService';

const CrearHabitacion = () => {
    const [habitacion, setHabitacion] = useState({
        habitacionnro: '',
        habitacionpiso: '',
        cantcamas: '',
        tienetelevision: false,
        tienefrigobar: false,
    });

    const navigate  = useNavigate ();

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setHabitacion((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? e.target.checked : value,
        }));
    };

    const crearHabitacion = (e) => {
        e.preventDefault();
        const habitacionData = {
            habitacionnro: parseInt(habitacion.habitacionnro, 10),
            habitacionpiso: parseInt(habitacion.habitacionpiso, 10),
            cantcamas: parseInt(habitacion.cantcamas, 10),
            tienetelevision: habitacion.tienetelevision === 'true',
            tienefrigobar: habitacion.tienefrigobar === 'true',
        };

        BackService.crearHabitacion(JSON.stringify(habitacionData)).then((resp) => {
            cancelar();
        });
    };

    const cancelar = () => {
        navigate ('../habitaciones');
    };

    return (
        <div style={{ margin: '25px 15px' }}>
            <h2>Crear Habitación</h2>

            <form onSubmit={crearHabitacion}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="habitacionnro">Nro Habitación</label>
                            <input
                                id="habitacionnro"
                                name="habitacionnro"
                                type="number"
                                className="form-control"
                                value={habitacion.habitacionnro}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="habitacionpiso">Nro Piso</label>
                            <input
                                id="habitacionpiso"
                                name="habitacionpiso"
                                type="number"
                                className="form-control"
                                value={habitacion.habitacionpiso}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="cantcamas">Cantidad Camas</label>
                            <input
                                id="cantcamas"
                                name="cantcamas"
                                type="number"
                                className="form-control"
                                value={habitacion.cantcamas}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="tienefrigobar">Frigobar</label>
                            <select
                                name="tienefrigobar"
                                id="tienefrigobar"
                                className="form-control"
                                value={habitacion.tienefrigobar}
                                onChange={handleChange}
                            >
                                <option value={true}>Sí</option>
                                <option value={false}>No</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="tienetelevision">Televisión</label>
                            <select
                                name="tienetelevision"
                                id="tienetelevision"
                                className="form-control"
                                value={habitacion.tienetelevision}
                                onChange={handleChange}
                            >
                                <option value={true}>Sí</option>
                                <option value={false}>No</option>
                            </select>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div style={{ textAlign: 'end' }}>
                        <button className="btn btn-success" type="submit">Crear</button>
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

export default CrearHabitacion;
