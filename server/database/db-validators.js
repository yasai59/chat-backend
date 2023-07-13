const Usuario = require("../models/User");

const emailRepetido = async (correo = "") => {
  // comprobamos si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya esta registrado`);
  }
};

const usuarioExiste = async (uid = "") => {
  // comprobamos si el usuario existe
  const existeUsuario = await Usuario.findById(uid);
  if (!existeUsuario) {
    throw new Error(`El usuario no existe`);
  }
};

module.exports = {
  emailRepetido,
  usuarioExiste,
};
