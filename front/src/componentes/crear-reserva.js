import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackService from '../services/backService';

const CrearReserva = () => {
    const [reserva, setReserva] = useState({
        habitacionid: '',
        personaid: '',
        fechaentrada: '',
        fechasalida: '',

    });
    const [habitaciones, setHabitaciones] = useState([]);
    const [personas, setPersonas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        listarHabitaciones();
        listarPersonas();
    }, []);

    const listarHabitaciones = () => {
        BackService.getHabitaciones().then((response) => {
            setHabitaciones(response.data);
        });
    };

    const listarPersonas = () => {
        BackService.getPersonas().then((response) => {
            setPersonas(response.data);
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReserva((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const crearReserva = (e) => {
        e.preventDefault();
        const reservaData = {
            habitacionid: parseInt(reserva.habitacionid, 10),
            personaid: parseInt(reserva.personaid, 10),
            fechasalida: reserva.fechasalida,
            fechaentrada: reserva.fechaentrada,
        }
        BackService.crearReserva(JSON.stringify(reservaData)).then(() => {
            cancelar();
        });
    };

    const cancelar = () => {
        navigate('../reservas');
    };

    return (
        <div style={{ margin: '25px 15px' }}>
            <h2>Crear Reserva</h2>

            <form onSubmit={crearReserva}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="habitacionid">Habitación</label>
                            <select
                                name="habitacionid"
                                id="habitacionid"
                                className="form-control"
                                value={reserva.habitacionid}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione una habitación</option>
                                {habitaciones.map((dato) => (
                                    <option key={dato.id} value={dato.id}>
                                        {dato.habitacionnro}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="personaid">Persona</label>
                            <select
                                name="personaid"
                                id="personaid"
                                className="form-control"
                                value={reserva.personaid}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione una persona</option>
                                {personas.map((dato) => (
                                    <option key={dato.id} value={dato.id}>
                                        {dato.nombrecompleto}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="fechaentrada">Fecha Entrada</label>
                            <input
                                id="fechaentrada"
                                name="fechaentrada"
                                type="date"
                                className="form-control"
                                value={reserva.fechaentrada}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="fechasalida">Fecha Salida</label>
                            <input
                                id="fechasalida"
                                name="fechasalida"
                                type="date"
                                className="form-control"
                                value={reserva.fechasalida}
                                onChange={handleChange}
                            />
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

export default CrearReserva;
