const jwt = require("jsonwebtoken"); // importamos la libreria jsonwebtoken

const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name }; // creamos el payload con el uid y el name del usuario
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        // firmamos el token el primer parametro es el payload, el segundo es la clave secreta y
        //  el tercero son las opciones
        // el tercer parametro es un objeto con las opciones del token

        expiresIn: "2h", // el token expirara en 2 horas
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }
        resolve(token); // si no hay errores, resolvemos la promesa con el token generado
        // el token es un string que contiene la informacion del payload y la firma
      }
    );
  });
};

module.exports = {
  generateJWT,
};
