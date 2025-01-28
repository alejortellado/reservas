const { body, validationResult } = require('express-validator');  // Importar express-validator
const reservaModel = require('../modelos/reserva');  // Importa el modelo de reservas

// Controlador para obtener todas las reservas
const getReservas = async (req, res) => {
  try {
    const reservas = await reservaModel.getAllReservas();  // Llamada al modelo
    res.json(reservas);  // Responde con las reservas obtenidas
  } catch (err) {
    res.status(500).send("Error al obtener reservas: " + err.message);  // Manejo de errores
  }
};

// Controlador para agregar una nueva reserva con validaciones
const createReserva = [
  // Validaciones para las fechas de entrada y salida
  body('fechaentrada').notEmpty().withMessage('La fecha de entrada es obligatoria').isDate().withMessage('La fecha de entrada debe ser una fecha válida en formato YYYY-MM-DD'),
  body('fechasalida').notEmpty().withMessage('La fecha de salida es obligatoria').isDate().withMessage('La fecha de salida debe ser una fecha válida en formato YYYY-MM-DD'),
  body('habitacionid').isInt().withMessage('El ID de la habitación debe ser un número entero'),
  body('personaid').isInt().withMessage('El ID de la persona debe ser un número entero'),

  // Función de validación y creación
  async (req, res) => {
    // Verificar si las validaciones han fallado
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });  // Si hay errores, devolverlos al cliente
    }

    // Extraer los datos de la solicitud
    const { fechaentrada, fechasalida, habitacionid, personaid } = req.body;

    try {
      // Llamar al modelo para crear la reserva
      const nuevaReserva = {
        fechaentrada,
        fechasalida,
        habitacionid,
        personaid
      };

      const result = await reservaModel.createReserva(nuevaReserva);  // Llamada al modelo para crear la reserva
      res.status(201).send("Reserva creada con éxito. ID: " + result.insertId);  // Responde con el ID de la nueva reserva
    } catch (err) {
      res.status(500).send("Error al crear reserva: " + err.message);  // Manejo de errores
    }
  }
];


// Controlador para eliminar una reserva
const deleteReserva = async (req, res) => {
  const id = req.params.id;  // Obtiene el ID de la reserva a eliminar desde los parámetros de la URL

  if (!id || isNaN(id)) {  // Validar que el ID es un número válido
    return res.status(400).send("ID de reserva inválido.");
  }

  try {
    const result = await reservaModel.deleteReserva(id);  // Llamada al modelo para eliminar la reserva
    if (result.affectedRows > 0) {
      res.status(200).send("Reserva eliminada con éxito.");
    } else {
      res.status(404).send("Reserva no encontrada.");
    }
  } catch (err) {
    res.status(500).send("Error al eliminar la reserva: " + err.message);  // Manejo de errores
  }
};

// Controlador para actualizar una reserva
const updateReserva = async (req, res) => {
  const id = req.params.id;  // Obtiene el ID de la reserva a actualizar desde los parámetros de la URL

  // Verificar si el ID es válido
  if (!id || isNaN(id)) {
    return res.status(400).send("ID de reserva inválido.");
  }

  // Extraer los nuevos datos para la reserva
  const { fechaentrada, fechasalida, habitacionid, personaid } = req.body;

  // Validaciones básicas
  if (!fechaentrada || !fechasalida || !habitacionid || !personaid) {
    return res.status(400).send("Todos los campos son requeridos.");
  }

  try {
    // Llamar al modelo para actualizar la reserva
    const result = await reservaModel.updateReserva(id, { fechaentrada, fechasalida, habitacionid, personaid });
    if (result.affectedRows > 0) {
      res.status(200).send("Reserva actualizada con éxito.");
    } else {
      res.status(404).send("Reserva no encontrada.");
    }
  } catch (err) {
    res.status(500).send("Error al actualizar la reserva: " + err.message);  // Manejo de errores
  }
};

module.exports = { getReservas, createReserva, deleteReserva, updateReserva };
