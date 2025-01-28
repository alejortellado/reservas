import axios from 'axios';

class BackService {
    constructor() {
        this.direccion = 'http://localhost:5000';
    }

    // Personas
    getPersonas() {
        return axios.get(`${this.direccion}/personas`);
    }

    editarPersona(id, jsonData) {
        return axios.put(`${this.direccion}/personas/${id}`, jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    crearPersona(jsonData) {
        return axios.post(`${this.direccion}/personas`, jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    eliminarPersona(id) {
        return axios.delete(`${this.direccion}/personas/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    // Habitaciones
    getHabitaciones() {
        return axios.get(`${this.direccion}/habitaciones`);
    }

    editarHabitacion(id, jsonData) {
        return axios.put(`${this.direccion}/habitaciones/${id}`, jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    crearHabitacion(jsonData) {
        return axios.post(`${this.direccion}/habitaciones`, jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    eliminarHabitacion(id) {
        return axios.delete(`${this.direccion}/habitaciones/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    // Reservas
    getReservas() {
        return axios.get(`${this.direccion}/reservas`);
    }

    editarReserva(id, jsonData) {
        return axios.put(`${this.direccion}/reservas/${id}`, jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    crearReserva(jsonData) {
        return axios.post(`${this.direccion}/reservas`, jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    eliminarReserva(id) {
        return axios.delete(`${this.direccion}/reservas/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export default new BackService();
