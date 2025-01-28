const { body, validationResult } = require('express-validator');  // Importar express-validator
const personaModel = require('../modelos/persona');  // Importar el modelo de personas

// Controlador para obtener todas las personas
const getPersonas = async (req, res) => {
  try {
    const personas = await personaModel.getAllPersonas();  // Llamada al modelo para obtener todas las personas
    res.json(personas);  // Responde con las personas obtenidas
  } catch (err) {
    res.status(500).send("Error al obtener personas: " + err.message);  // Manejo de errores
  }
};

// Controlador para agregar una nueva persona con validaciones
const createPersona = [
  // Validaciones usando express-validator
  body('nombrecompleto').notEmpty().withMessage('El nombre completo es obligatorio'),
  body('nrodocumento').notEmpty().withMessage('El número de documento es obligatorio').isNumeric().withMessage('El número de documento debe ser un valor numérico'),
  body('correo').notEmpty().withMessage('El correo es obligatorio').isEmail().withMessage('El correo debe ser válido'),
  body('telefono').notEmpty().withMessage('El teléfono es obligatorio').isNumeric().withMessage('El teléfono debe ser un valor numérico'),

  // Función de validación y creación
  async (req, res) => {
    // Verificar si las validaciones han fallado
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });  // Si hay errores, devolverlos al cliente
    }

    // Extraer los datos de la solicitud
    const { nombrecompleto, nrodocumento, correo, telefono } = req.body;

    try {
      // Llamar al modelo para crear la persona
      const nuevaPersona = { nombrecompleto, nrodocumento, correo, telefono };
      const result = await personaModel.createPersona(nuevaPersona);  // Llamada al modelo para crear la persona
      res.status(201).send("Persona creada con éxito. ID: " + result.insertId);  // Responde con el ID de la nueva persona
    } catch (err) {
      res.status(500).send("Error al crear persona: " + err.message);  // Manejo de errores
    }
  }
];

// Controlador para actualizar una persona
const updatePersona = [
  // Validaciones usando express-validator
  body('nombrecompleto').notEmpty().withMessage('El nombre completo es obligatorio'),
  body('nrodocumento').notEmpty().withMessage('El número de documento es obligatorio').isNumeric().withMessage('El número de documento debe ser un valor numérico'),
  body('correo').notEmpty().withMessage('El correo es obligatorio').isEmail().withMessage('El correo debe ser válido'),
  body('telefono').notEmpty().withMessage('El teléfono es obligatorio').isNumeric().withMessage('El teléfono debe ser un valor numérico'),

  // Función de validación y actualización
  async (req, res) => {
    // Verificar si las validaciones han fallado
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });  // Si hay errores, devolverlos al cliente
    }

    const id = req.params.id;  // Obtiene el ID de la persona a actualizar desde los parámetros de la URL

    // Verificar si el ID es válido
    if (!id || isNaN(id)) {
      return res.status(400).send("ID de persona inválido.");
    }

    // Extraer los datos de la solicitud
    const { nombrecompleto, nrodocumento, correo, telefono } = req.body;

    try {
      // Llamar al modelo para actualizar la persona
      const result = await personaModel.updatePersona(id, { nombrecompleto, nrodocumento, correo, telefono });
      if (result.affectedRows > 0) {
        res.status(200).send("Persona actualizada con éxito.");
      } else {
        res.status(404).send("Persona no encontrada.");
      }
    } catch (err) {
      res.status(500).send("Error al actualizar persona: " + err.message);  // Manejo de errores
    }
  }
];

// Controlador para eliminar una persona
const deletePersona = async (req, res) => {
  const id = req.params.id;  // Obtiene el ID de la persona a eliminar desde los parámetros de la URL

  // Validar que el ID es un número válido
  if (!id || isNaN(id)) {
    return res.status(400).send("ID de persona inválido.");
  }

  try {
    const result = await personaModel.deletePersona(id);  // Llamada al modelo para eliminar la persona
    if (result.affectedRows > 0) {
      res.status(200).send("Persona eliminada con éxito.");
    } else {
      res.status(404).send("Persona no encontrada.");
    }
  } catch (err) {
    res.status(500).send("Error al eliminar persona: " + err.message);  // Manejo de errores
  }
};

module.exports = { getPersonas, createPersona, updatePersona, deletePersona };
