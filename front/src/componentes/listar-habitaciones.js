import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import BackService from '../services/backService';
import CrearHabitacion from "./crear-habitacion";

const ListarHabitaciones = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const navigate  = useNavigate ();

    useEffect(() => {
        listarHabitaciones();
    }, []);

    const listarHabitaciones = () => {
        BackService.getHabitaciones().then((response) => {
            setHabitaciones(response.data);
        }).catch((error) => {
            console.error('Error al listar habitaciones:', error);
        });
    };

    const crear = () => {
        navigate('./crear');
    };

    const editar = (id, dato) => {
        navigate (`./${id}`, { state: dato });
    };

    const eliminar = (id) => {
        BackService.eliminarHabitacion(id).then(() => {
            listarHabitaciones();
        }).catch((error) => {
            console.error('Error al eliminar habitación:', error);
        });
    };

    const goTo = () => {
        navigate ('../');
    };

    return (
        <div style={{ margin: '25px 15px' }}>
      <span className="link-primary" style={{ cursor: 'pointer' }} onClick={goTo}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
        </svg>
        Inicio
      </span>
            <br />
            <h2>Listado Habitaciones</h2>

            <div style={{ textAlign: 'end' }}>
                <button className="btn btn-success" onClick={crear}>Crear Habitación</button>
            </div>
            {habitaciones.length === 0 ?(
                <p>Cargando...</p>
            ) : (
                <div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th className="text-center">Nro Habitación</th>
                            <th className="text-center">Nro Piso</th>
                            <th className="text-center">Cantidad Camas</th>
                            <th className="text-center">Frigobar</th>
                            <th className="text-center">Televisión</th>
                            <th className="text-center">Editar</th>
                            <th className="text-center">Eliminar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {habitaciones.map((dato) => (
                            <tr key={dato.id}>
                                <td className="text-center">{dato.habitacionnro}</td>
                                <td className="text-center">{dato.habitacionpiso}</td>
                                <td className="text-center">{dato.cantcamas}</td>
                                <td className="text-center">
                                    {dato.tienefrigobar ? 'Tiene' : 'No Tiene'}
                                </td>
                                <td className="text-center">
                                    {dato.tienetelevision ? 'Tiene' : 'No Tiene'}
                                </td>
                                <td className="text-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-pencil-square"
                                        viewBox="0 0 16 16"
                                        style={{cursor: 'pointer'}}
                                        onClick={() => editar(dato.id, dato)}
                                    >
                                        <path
                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fill-rule="evenodd"
                                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                    </svg>
                                </td>
                                <td className="text-center">
                                    <button className="btn btn-danger" onClick={() => eliminar(dato.id)}>x</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
};

export default ListarHabitaciones;
