// db.js
const mysql = require('mysql2');

// Configuración de la conexión
const connection = mysql.createConnection({
  host: 'localhost',  // Dirección del servidor de la base de datos
  user: 'root',       // Tu usuario de MySQL (por defecto es 'root')
  password: 'BlankSpace08',       // Tu contraseña de MySQL (déjala vacía si no tiene contraseña)
  database: 'reservas_db',  // El nombre de tu base de datos
  port: 3306          // El puerto de MySQL (por defecto es 3306)
});

// Conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos con el id: ' + connection.threadId);
});

// Exporta la conexión para usarla en otras partes de tu proyecto
module.exports = connection;
