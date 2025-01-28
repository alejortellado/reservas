import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './componentes/home'; // Asegúrate de que la ruta sea correcta
import CrearHabitacion from './componentes/crear-habitacion'; // Asegúrate de que la ruta sea correcta
import EditarHabitacion from './componentes/editar-habitacion'; // Asegúrate de que la ruta sea correcta
import ListarHabitaciones from './componentes/listar-habitaciones'; // Asegúrate de que la ruta sea correcta
import './App.css';
import ListarPersonas from "./componentes/listar-personas";
import CrearPersona from "./componentes/crear-persona";
import EditarPersona from "./componentes/editar-persona";
import ListarReservas from "./componentes/listar-reservas";
import CrearReserva from "./componentes/crear-reserva";
import EditarReserva from "./componentes/editar-reserva";

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/habitaciones/crear" element={<CrearHabitacion />} />
            <Route path="/habitaciones/:id" element={<EditarHabitacion />} />
            <Route path="/habitaciones" element={<ListarHabitaciones />} />
            <Route path="/personas/crear" element={<CrearPersona />} />
            <Route path="/personas/:id" element={<EditarPersona />} />
            <Route path="/personas" element={<ListarPersonas />} />
            <Route path="/reservas/crear" element={<CrearReserva />} />
            <Route path="/reservas/:id" element={<EditarReserva />} />
            <Route path="/reservas" element={<ListarReservas />} />
          {/* Agrega más rutas según sea necesario */}
        </Routes>
      </Router>
  );
}

export default App;
