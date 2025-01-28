const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importa cors
const habitacionRoutes = require("./rutas/habitacionRoutes");
const personaRoutes = require("./rutas/personaRoutes");
const reservaRoutes = require("./rutas/reservaRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000' // Solo permite solicitudes desde este origen
}));

app.use(bodyParser.json()); // Middleware para manejar datos JSON

// Rutas
app.use("/habitaciones", habitacionRoutes);
app.use("/personas", personaRoutes);
app.use("/reservas", reservaRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
