const express = require('express');
const reservaController = require('../controladores/reservaController');

const router = express.Router();

// Ruta para obtener todas las reservas
router.get('/', reservaController.getReservas);

// Ruta para agregar una nueva reserva
router.post('/', reservaController.createReserva);

// Ruta para eliminar una reserva por ID
router.delete('/:id', reservaController.deleteReserva);

// Ruta para actualizar una reserva por ID
router.put('/:id', reservaController.updateReserva);

module.exports = router;
