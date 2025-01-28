const connection = require('../db'); // Importa la conexión a la base de datos

// Función para validar los datos de una habitación
const validarHabitacion = (habitacion) => {
  const { habitacionpiso, habitacionnro, cantcamas, tienetelevision, tienefrigobar } = habitacion;

  if (!Number.isInteger(habitacionpiso) || habitacionpiso <= 0 || habitacionpiso > 10) {
    throw new Error('El piso de la habitación debe ser un número entero entre 1 y 10.');
  }

  if (!Number.isInteger(habitacionnro) || habitacionnro <= 0 || habitacionnro > 20) {
    throw new Error('El número de la habitación debe ser un número entero entre 1 y 20.');
  }

  if (!Number.isInteger(cantcamas) || cantcamas < 1 || cantcamas > 4) {
    throw new Error('La cantidad de camas debe ser un número entero entre 1 y 4.');
  }

  if (typeof tienetelevision !== 'boolean') {
    throw new Error('El campo "tienetelevision" debe ser un valor booleano (true o false).');
  }

  if (typeof tienefrigobar !== 'boolean') {
    throw new Error('El campo "tienefrigobar" debe ser un valor booleano (true o false).');
  }
};

// Función para obtener todas las habitaciones
const getAllHabitaciones = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM habitaciones', (err, results) => {
      if (err) {
        reject(err); // Si hay un error, lo rechazamos
      } else {
        resolve(results); // Si todo está bien, devolvemos los resultados
      }
    });
  });
};

// Función para agregar una nueva habitación (POST)
const createHabitacion = (habitacion) => {
  return new Promise((resolve, reject) => {
    try {
      // Validar los datos antes de la inserción
      validarHabitacion(habitacion);

      const { habitacionpiso, habitacionnro, cantcamas, tienetelevision, tienefrigobar } = habitacion;

      connection.query(
        'INSERT INTO habitaciones (habitacionpiso, habitacionnro, cantcamas, tienetelevision, tienefrigobar) VALUES (?, ?, ?, ?, ?)',
        [habitacionpiso, habitacionnro, cantcamas, tienetelevision, tienefrigobar],
        (err, results) => {
          if (err) reject(err); // Si hay un error, lo rechazamos
          resolve(results); // Si todo está bien, devolvemos los resultados
        }
      );
    } catch (error) {
      reject(error); // Si la validación falla, rechazamos con el error correspondiente
    }
  });
};

// Función para eliminar una habitación por id (DELETE)
const deleteHabitacion = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM habitaciones WHERE id = ?', [id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Función para actualizar una habitación por id
const updateHabitacion = (id, habitacion) => {
  const { habitacionpiso, habitacionnro, cantcamas, tienetelevision, tienefrigobar } = habitacion;
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE habitaciones 
      SET habitacionpiso = ?, habitacionnro = ?, cantcamas = ?, tienetelevision = ?, tienefrigobar = ? 
      WHERE id = ?`;
    connection.query(query, [habitacionpiso, habitacionnro, cantcamas, tienetelevision, tienefrigobar, id], (err, result) => {
      if (err) reject(err); // Si hay un error, lo rechazamos
      resolve(result); // Si todo está bien, devolvemos el resultado
    });
  });
};

// Exporta las funciones
module.exports = { getAllHabitaciones, createHabitacion, deleteHabitacion, updateHabitacion };
