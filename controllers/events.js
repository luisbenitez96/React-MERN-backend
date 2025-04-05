const { response } = require("express");
const Event = require("../models/event");
const event = require("../models/event");

const getEvent = async (req, res = response) => {
  const events = await Event.find().populate("user", "name"); // se le pasa el id del usuario que creo el evento, y se le pide que solo devuelva el nombre del usuario

  res.json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body); // se crea una nueva instancia del modelo event, se le pasa el objeto req.body, que contiene los datos del evento que se van a crear, el req.body es el cuerpo de la peticion http, que contiene los datos que se envian al servidor desde el cliente.
  console.log(event.user);
  try {
    event.user = req.uid; // se le asigna el id del usuario que esta creando el evento, el req.uid es el id del usuario que se obtiene del token de autenticacion
    const saveEvent = await event.save();
    res.json({
      ok: true,
      event: saveEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
  // Verificar que tenga el evento
};

const upgradeEvent = async (req, res = response) => {
  const eventId = req.params.id; // se obtiene el id del evento que se va a actualizar
  const uid = req.uid; // se obtiene el id del usuario que esta autenticado
  try {
    const event = await Event.findById(eventId); // se busca el evento por su id
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no encontrado por id",
      });
    }
    if (event.user.toString() !== uid) {
      // se verifica si el id del usuario que esta autenticado es el mismo que el id del usuario que creo el evento
      // si no son iguales, significa que el usuario no tiene privilegios para editar el evento
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegios para editar este evento",
      });
    }
    const newEvent = {
      // se crea un nuevo objeto con los datos del evento que se van a actualizar
      // se le pasa el user: id del usuario que esta autenticado, se guarada ...req.body, que contiene los datos del evento que se van a actualizar
      ...req.body,
      user: uid,
    };

    const eventUpdate = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.json({
      ok: true,
      event: eventUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};
const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no encontrado por id",
      });
    }
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegios para editar este evento",
      });
    }
    await Event.findByIdAndDelete(eventId);

    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};
module.exports = {
  getEvent,
  createEvent,
  upgradeEvent,
  deleteEvent,
};
