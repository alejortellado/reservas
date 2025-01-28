const connection = require('../db'); // Importa la conexión a la base de datos
const moment = require('moment'); // Para manejar fechas fácilmente

// Función para obtener todas las reservas
const getAllReservas = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM reservas', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Función para crear una nueva reserva con validaciones
const createReserva = (reserva) => {
  const { fechaentrada, fechasalida, habitacionid, personaid } = reserva;

  return new Promise((resolve, reject) => {
    // Validación: Verificar que las fechas sean válidas
    const hoy = moment().startOf('day');
    const entrada = moment(fechaentrada, 'YYYY-MM-DD');
    const salida = moment(fechasalida, 'YYYY-MM-DD');

    if (!entrada.isValid() || !salida.isValid()) {
      return reject(new Error('Las fechas de entrada y salida deben ser válidas.'));
    }

    if (entrada.isSameOrBefore(hoy)) {
      return reject(new Error('La fecha de entrada debe ser mayor al día actual.'));
    }

    if (salida.isSameOrBefore(entrada)) {
      return reject(new Error('La fecha de salida debe ser mayor a la fecha de entrada.'));
    }

    // Validación: Comprobar si la habitación está disponible en el rango de fechas
    const disponibilidadQuery = `
      SELECT COUNT(*) AS conflictos 
      FROM reservas 
      WHERE habitacionid = ? 
        AND ((fechaentrada <= ? AND fechasalida >= ?) OR (fechaentrada <= ? AND fechasalida >= ?))
    `;
    connection.query(
      disponibilidadQuery,
      [habitacionid, entrada.format('YYYY-MM-DD'), entrada.format('YYYY-MM-DD'), salida.format('YYYY-MM-DD'), salida.format('YYYY-MM-DD')],
      (err, results) => {
        if (err) {
          return reject(err);
        }

        if (results[0].conflictos > 0) {
          return reject(new Error('La habitación no está disponible en el rango de fechas seleccionado.'));
        }

        // Cálculo de monto de reserva (días * 120,000)
        const dias = salida.diff(entrada, 'days');
        const montoreserva = dias * 120000;

        // Si todo está bien, insertar la reserva
        const query = `
          INSERT INTO reservas (fechaentrada, fechasalida, habitacionid, personaid) 
          VALUES (?, ?, ?, ?)
        `;
        connection.query(
          query,
          [entrada.format('YYYY-MM-DD'), salida.format('YYYY-MM-DD'), habitacionid, personaid],
          (err, result) => {
            if (err) {
              return reject(err);
            }
            resolve(result);
          }
        );
      }
    );
  });
};

// Función para eliminar una reserva por ID
const deleteReserva = (id) => {
  const query = 'DELETE FROM reservas WHERE id = ?';

  return new Promise((resolve, reject) => {
    connection.query(query, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result); // Devuelve el resultado de la eliminación
      }
    });
  });
};

// Función para actualizar una reserva
const updateReserva = (id, reserva) => {
  const { fechaentrada, fechasalida, habitacionid, personaid } = reserva;

  return new Promise((resolve, reject) => {
    const query = `
      UPDATE reservas
      SET fechaentrada = ?, fechasalida = ?, habitacionid = ?, personaid = ?
      WHERE id = ?
    `;

    connection.query(
      query,
      [fechaentrada, fechasalida, habitacionid, personaid, id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result); // Devuelve el resultado de la actualización
        }
      }
    );
  });
};

module.exports = { getAllReservas, createReserva, deleteReserva, updateReserva };
