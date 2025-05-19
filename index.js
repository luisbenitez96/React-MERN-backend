const path = require("path"); // se importa el modulo path que permite trabajar con rutas de archivos y directorios

const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./databases/config"); // se importa la funcion dbConnection del archivo config.js que se encuentra en la carpeta databases, la base de datos es mongodb
const cors = require("cors"); // se importa el paquete cors que permite habilitar el acceso a la api desde cualquier origen, es un middleware que se encarga de habilitar el acceso a la api desde cualquier origen, es necesario para poder hacer peticiones desde el frontend a la api

// Crear el servidor de express

const app = express();

// Base de Datos
dbConnection();

// Cors
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",

      "https://react-mern-backend-production-644b.up.railway.app",
    ],
    credentials: true, // Si usas cookies o autenticación basada en sesión
  })
);

// Directorio publico

app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json()); // middleware que permite leer el body de la peticion y parsearlo a json

//Rutas
app.use("/api/auth", require("./routes/auth")); // esta ruta es para la autenticacion, app.use es para usar el middleware que es el encargado de hacer la peticion a la base de datos y devolver la respuesta al cliente
app.use("/api/events", require("./routes/events"));

app.use(express.static(path.join(__dirname, "public"))); // res.sendFile es para enviar un archivo al cliente, en este caso el archivo index.html que se encuentra en la carpeta public, __dirname es una variable global que contiene la ruta del directorio actual, path.join es para unir las rutas de los archivos y directorios

// escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
