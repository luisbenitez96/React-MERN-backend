/* 
Event Routes
/api/events
*/

const { validateJWT } = require("../middlewares/validate-jwt");
const { Router } = require("express");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");
const { fieldValidators } = require("../middlewares/fieldValidators"); // middleware para validar los campos
const {
  getEvent,
  createEvent,
  upgradeEvent,
  deleteEvent,
} = require("../controllers/events"); // rutas eventos

const router = Router();

router.use(validateJWT); // middleware para validar el token
// todas las rutas tienen que pasar por la validacion de jwt

// obtener eventos

router.get("/", getEvent);

// crear un evento
router.post(
  "/",
  [
    check("title", " El titulo es obligatorio").not().isEmpty(),
    check("start", " Fecha de inicio es obligatorio").custom(isDate),
    check("end", " Fecha de fin es obligatorio").custom(isDate),
    fieldValidators,
  ],
  createEvent
);

// Actualizar un evento
router.put(
  "/:id",
  [
    check("title", " El titulo es obligatorio").not().isEmpty(),
    check("start", " Fecha de inicio es obligatorio").custom(isDate),
    check("end", " Fecha de fin es obligatorio").custom(isDate),
    fieldValidators,
  ],
  upgradeEvent
);

// Actualizar un evento
router.delete("/:id", deleteEvent);

module.exports = router;
