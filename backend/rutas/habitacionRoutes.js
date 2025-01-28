const express = require('express');
const habitacionController = require('../controladores/habitacionController');

const router = express.Router();

// Ruta para obtener todas las habitaciones
router.get('/', habitacionController.getHabitaciones);

// Ruta para agregar una nueva habitación (POST)
router.post('/', habitacionController.createHabitacion);

// Ruta para eliminar una habitación por id (DELETE)
router.delete('/:id', habitacionController.deleteHabitacion);

// Ruta para actualizar una habitación
router.put('/:id', habitacionController.updateHabitacion);

module.exports = router;
