const { response } = require("express");
const bcrypt = require("bcryptjs"); // libreria para encriptar contraseñas
const User = require("../models/user"); // importamos el modelo de usuario
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body; // destructuracion de objetos, se extraen las propiedades del objeto req.body y se asignan a variables con el mismo nombre.
  try {
    let user = await User.findOne({ email }); // buscamos si el usuario ya existe en la base de datos
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe",
      });
    }

    user = new User(req.body); // creamos una instancia del modelo User

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync(); // generamos un salt para encriptar la contraseña
    user.password = bcrypt.hashSync(password, salt); // encriptamos la contraseña

    await user.save(); // guardamos el usuario en la base de datos
    // generar el token - JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};
const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }); // buscamos si el usuario ya existe en la base de datos
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese email ",
      });
    }

    // comprobar la contraseña
    const validPassword = bcrypt.compareSync(password, user.password); // comparamos la contraseña ingresada con la contraseña encriptada en la base de datos
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }
    // generar el token - JWT
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

const revalidateToken = async (req, res = response) => {
  const uid = req.uid;
  const name = req.name;
  // generar un nuevo token - JWT
  const token = await generateJWT(uid, name);
  res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = { createUser, loginUser, revalidateToken };

// express.response es un objeto que representa la respuesta HTTP que se va a enviar al cliente. Este objeto tiene varios métodos y propiedades que se pueden utilizar para configurar la respuesta, como el código de estado, los encabezados y el cuerpo de la respuesta. En este caso, se está utilizando el método json() para enviar una respuesta JSON al cliente, también sirve para recuperar el intelisense de vsCode en caso de que se borre la información.
