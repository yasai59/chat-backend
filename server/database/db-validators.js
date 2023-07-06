const Usuario = require('../models/User');

const emailRepetido = async (correo = '') => {
  // comprobamos si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya esta registrado`);
  }
};

module.exports = {
  emailRepetido,
};