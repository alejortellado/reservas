const habitacionModel = require('../modelos/habitacion'); 

// Controlador para obtener todas las habitaciones
const getHabitaciones = async (req, res) => {
  try {
    const habitaciones = await habitacionModel.getAllHabitaciones(); // Llamada al modelo
    res.json(habitaciones); // Responde con las habitaciones obtenidas
  } catch (err) {
    res.status(500).send("Error al obtener habitaciones: " + err.message); // Manejo de errores
  }
};


// Controlador para agregar una nueva habitación (POST)
const createHabitacion = async (req, res) => {
  try {
    const { habitacionpiso, habitacionnro, cantcamas, tienetelevision, tienefrigobar } = req.body;

    // Validación para comprobar si el campo 'habitacionpiso' está presente
    if (habitacionpiso === undefined || habitacionpiso === null) {
      return res.status(400).send("El piso de la habitación es obligatorio.");
    }
    // Validación para comprobar si el campo 'habitacionnro' está presente
    if (habitacionnro === undefined || habitacionnro === null) {
      return res.status(400).send("El número de la habitación es obligatorio.");
    }
    // Validación para comprobar si el campo 'habitacionnro' está presente
    if (cantcamas === undefined || cantcamas === null) {
      return res.status(400).send("La cantidad de camas es obligatorio.");
    }

    // Validaciones:
    if (!habitacionpiso || habitacionpiso < 1 || habitacionpiso > 10) {
      return res.status(400).send("El número de piso debe ser un entero entre 1 y 10.");
    }

    if (!habitacionnro || habitacionnro < 1 || habitacionnro > 20) {
      return res.status(400).send("El número de habitación debe ser un entero entre 1 y 20.");
    }

    if (!cantcamas || cantcamas < 1 || cantcamas > 4) {
      return res.status(400).send("La cantidad de camas debe ser un entero entre 1 y 4.");
    }

    // Convertir '1' y '0' a booleano para 'tienetelevision' y 'tienefrigobar'
    const isTelevision = tienetelevision === 1 || tienetelevision === true;
    const isFrigobar = tienefrigobar === 1 || tienefrigobar === true;

    // Validación para 'tienetelevision' (permitir 1, 0, true, false)
    if (![1, 0, true, false].includes(tienetelevision)) {
      return res.status(400).send("El campo 'tienetelevision' debe ser true/false o 1/0.");
    }

    // Validación para 'tienefrigobar' (permitir 1, 0, true, false)
    if (![1, 0, true, false].includes(tienefrigobar)) {
      return res.status(400).send("El campo 'tienefrigobar' debe ser true/false o 1/0.");
    }

    const nuevaHabitacion = { habitacionpiso, habitacionnro, cantcamas, tienetelevision: isTelevision, tienefrigobar: isFrigobar };

    const result = await habitacionModel.createHabitacion(nuevaHabitacion); // Llamada al modelo
    res.status(201).send("Habitación creada con éxito. ID: " + result.insertId); // Responde con mensaje de éxito
  } catch (err) {
    res.status(500).send("Error al crear habitación: " + err.message); // Manejo de errores
  }
};


// Controlador para eliminar una habitación
const deleteHabitacion = async (req, res) => {
  const { id } = req.params; // Obtener el id de la URL
  try {
    const result = await habitacionModel.deleteHabitacion(id);
    if (result.affectedRows === 0) {
      return res.status(404).send("Habitación no encontrada.");
    }
    res.status(200).send("Habitación eliminada con éxito.");
  } catch (err) {
    res.status(500).send("Error al eliminar habitación: " + err.message);
  }
};

// Controlador para actualizar una habitación
const updateHabitacion = async (req, res) => {
  const { id } = req.params; // Obtener el ID de la URL
  const { habitacionpiso, habitacionnro, cantcamas, tienetelevision, tienefrigobar } = req.body;

  // Validaciones:
  if (!habitacionpiso || habitacionpiso < 1 || habitacionpiso > 10) {
    return res.status(400).send("El número de piso debe ser un entero entre 1 y 10.");
  }
  if (!habitacionnro || habitacionnro < 1 || habitacionnro > 20) {
    return res.status(400).send("El número de habitación debe ser un entero entre 1 y 20.");
  }
  if (!cantcamas || cantcamas < 1 || cantcamas > 4) {
    return res.status(400).send("La cantidad de camas debe ser un entero entre 1 y 4.");
  }
  if (![1, 0, true, false].includes(tienetelevision)) {
    return res.status(400).send("El campo 'tienetelevision' debe ser true/false o 1/0.");
  }

  if (![1, 0, true, false].includes(tienefrigobar)) {
    return res.status(400).send("El campo 'tienefrigobar' debe ser true/false o 1/0.");
  }

  try {
    const habitacionActualizada = { habitacionpiso, habitacionnro, cantcamas, tienetelevision, tienefrigobar };
    const result = await habitacionModel.updateHabitacion(id, habitacionActualizada);

    if (result.affectedRows === 0) {
      return res.status(404).send("Habitación no encontrada.");
    }

    res.status(200).send("Habitación actualizada con éxito.");
  } catch (err) {
    res.status(500).send("Error al actualizar habitación: " + err.message);
  }
};

module.exports = { getHabitaciones, createHabitacion, deleteHabitacion, updateHabitacion };





