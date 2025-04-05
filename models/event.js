const { Schema, model } = require("mongoose");

const eventSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },

  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,

    // esto sirve para referenciar un id de otro modelo
    // en este caso el modelo de user
    // el id de la base de datos

    ref: "User",
    required: true,
  },
});

eventSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Event", eventSchema);
