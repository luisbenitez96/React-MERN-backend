const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log("Base de datos online");
  } catch (error) {
    console.log(error);
    throw new Error("Error en la base de datos");
  }
};

module.exports = {
  dbConnection,
};
