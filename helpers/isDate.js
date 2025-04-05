const moment = require("moment");
// es una libreria para manejar fechas, se importa la libreria moment

const isDate = (value, res) => {
  if (!value) {
    return false;
  }
  const date = moment(value);
  if (date.isValid()) {
    return true;
  } else {
    return false;
  }
};

module.exports = { isDate };
