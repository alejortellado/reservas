const connection = require('../db');  // Suponiendo que tienes una conexión a la base de datos

// Función para obtener todas las personas
const getAllPersonas = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM personas';  // Consulta para obtener todas las personas

    connection.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);  // Devuelve todas las personas
      }
    });
  });
};

// Función para crear una nueva persona
const createPersona = (persona) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO personas (nombrecompleto, nrodocumento, correo, telefono) VALUES (?, ?, ?, ?)';
    connection.query(query, [persona.nombrecompleto, persona.nrodocumento, persona.correo, persona.telefono], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);  // Devuelve el resultado de la inserción
      }
    });
  });
};

// Función para actualizar una persona por ID
const updatePersona = (id, persona) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE personas SET nombrecompleto = ?, nrodocumento = ?, correo = ?, telefono = ? WHERE id = ?';
    connection.query(query, [persona.nombrecompleto, persona.nrodocumento, persona.correo, persona.telefono, id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);  // Devuelve el resultado de la actualización
      }
    });
  });
};

// Función para eliminar una persona por ID
const deletePersona = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM personas WHERE id = ?';
    connection.query(query, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);  // Devuelve el resultado de la eliminación
      }
    });
  });
};

module.exports = { getAllPersonas, createPersona, updatePersona, deletePersona };
