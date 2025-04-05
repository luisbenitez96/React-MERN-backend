/*
Rutas de Usiarios / Auth
host + / api/auth

*/

const { Router } = require("express"); // es una libreria de node.js que nos permite crear un servidor web, se saca el Router del express.

const router = Router(); // es un objeto que nos permite crear rutas en nuestro servidor web
const { check } = require("express-validator"); // es una libreria de node.js que nos permite validar los datos que recibimos en las peticiones http, se saca el check del express-validator.
const { fieldValidators } = require("../middlewares/fieldValidators"); // se importa el middleware que se encarga de validar los datos que recibimos en las peticiones http, se saca el fieldValidators del middlewares/fieldValidators.js

const {
  createUser,
  loginUser,
  revalidateToken,
} = require("../controllers/auth");

const { validateJWT } = require("../middlewares/validate-jwt"); // se importa el middleware que se encarga de validar el token que recibimos en las peticiones http, se saca el validateJWT del middlewares/validate-jwt.js

router.post(
  "/new",
  [
    // middeware
    check("name", "el nombre es obligartorio ").not().isEmpty(), // validar que el nombre no este vacio
    check("email", "el email es obligartorio ").isEmail(),
    check("password", "el password debe de ser de 6 caracteres ").isLength({
      min: 6,
      fieldValidators,
    }),
  ],
  createUser
); // el controlador es el encargado de hacer la peticion a la base de datos y devolver la respuesta al cliente
router.post(
  "/",
  [
    check("email", "el email es obligartorio ").isEmail(),
    check("password", "el password debe de ser de 6 caracteres ").isLength({
      min: 6,
      fieldValidators,
    }),
  ],
  loginUser
);

router.get("/renew", validateJWT, revalidateToken);
module.exports = router;
