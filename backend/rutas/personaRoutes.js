const express = require('express');
const personaController = require('../controladores/personaController');

const router = express.Router();

// Ruta para obtener todas las personas
router.get('/', personaController.getPersonas);

// Ruta para crear una nueva persona
router.post('/', personaController.createPersona);

// Ruta para eliminar una persona por id
router.delete('/:id', personaController.deletePersona);

// Ruta para actualizar una persona por ID
router.put('/:id', personaController.updatePersona);

module.exports = router;
