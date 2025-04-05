const { response } = require("express");
const { validationResult } = require("express-validator"); // el validationResult es una funcion que se encarga de validar los datos que recibimos en las peticiones http, se saca el validationResult del express-validator.

const fieldValidators = (req, res = response, next) => {
  // manejo de errores

  const errors = validationResult(req); // se crea una variable errors que contiene los errores de la validacion, se le pasa el objeto req a la funcion validationResult.

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(), // se devuelve un objeto con los errores de la validacion, se le pasa el objeto errors a la funcion mapped, el metodo mapped sale del valiodationResult, que esta alamcenado en la variable errors.
    });
  }

  next();
};

module.exports = {
  fieldValidators,
};
