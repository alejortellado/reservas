import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackService from '../services/backService';

const ListarReservas = () => {
    const [reservas, setReservas] = useState([]);
    const [habitaciones, setHabitaciones] = useState([]);
    const [personas, setPersonas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        listarPersonas();
        listarHabitaciones();
        listarReservas();
    }, []);

    const listarReservas = () => {
        BackService.getReservas().then((response) => {
            setReservas(response.data);
        });
    };

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

    const getPersonaNombre = (id) => {
        const persona = personas.find(p => p.id === id);
        return persona ? persona.nombrecompleto : 'Desconocido';
    };

    const getHabitacionNro = (id) => {
        const habitacion = habitaciones.find(h => h.id === id);
        return habitacion ? habitacion.habitacionnro : 'Desconocido';
    };

    const crear = () => {
        navigate('./crear');
    };

    const editar = (id, dato) => {
        navigate(`./${id}`, { state:  dato });
    };

    const eliminar = (id) => {
        BackService.eliminarReserva(id).then(() => {
            listarReservas();
        });
    };

    const goTo = () => {
        navigate('../');
    };

    return (
        <div style={{ margin: '25px 15px' }}>
            <span className="link-primary" style={{cursor: 'pointer'}} onClick={goTo}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-house" viewBox="0 0 16 16">
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                </svg>
                Inicio
            </span>
            <br/>
            <h2>Listado Reservas</h2>

            <div style={{textAlign: 'end'}}>
                <button className="btn btn-success" onClick={crear}>Crear Reserva</button>
            </div>

            {reservas.length === 0 ?(
                <p>Cargando...</p>
            ) : (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th className="text-center">Nro Habitación</th>
                        <th className="text-center">Persona</th>
                        <th className="text-center">Fecha Reserva</th>
                        <th className="text-center">Monto Reserva</th>
                        <th className="text-center">Fecha Entrada</th>
                        <th className="text-center">Fecha Salida</th>
                        <th className="text-center">Editar</th>
                        <th className="text-center">Eliminar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reservas.map((dato) => (
                        <tr key={dato.id}>
                            <td className="text-center">{getHabitacionNro(dato.habitacionid)}</td>
                            <td className="text-center">{getPersonaNombre(dato.personaid)}</td>
                            <td className="text-center">{new Date(dato.fechareserva).toLocaleDateString()}</td>
                            <td className="text-center">{dato.montoreserva}</td>
                            <td className="text-center">{new Date(dato.fechaentrada).toLocaleDateString()}</td>
                            <td className="text-center">{new Date(dato.fechasalida).toLocaleDateString()}</td>
                            <td className="text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-pencil-square" viewBox="0 0 16 16" style={{cursor: 'pointer'}}
                                onClick={() => editar(dato.id, dato)}>
                                <path
                                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd"
                                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                        </td>
                        <td className="text-center">
                        <button className="btn btn-danger" onClick={() => eliminar(dato.id)}>x
                    </button>
                </td>
            </tr>
            ))}
        </tbody>
</table>
</div>
            )}
</div>
)
    ;
};

export default ListarReservas;
