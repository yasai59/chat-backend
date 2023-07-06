const { Request, Response } = require("express");
const  Usuario  = require("../models/User");
const { check } = require("express-validator");
const bcryptjs = require("bcryptjs");

const usuariosPost = (req = Request, res = Response) => {
  // recojemos los datos del body
  const { body } = req;
  const { nombre, correo, password, imagen } = body;
  // creamos la instancia del usuario
  const usuario = new Usuario({ nombre, correo, password, imagen });

  // Encriptamos la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // insertamos el rol de usuario
  usuario.rol = "USER_ROLE";

  // guardamos el usuario en la base de datos
  usuario.save();

  // damos una respuesta al frontend
  res.json({
    msg: "postUser ok",
    usuario,
  });
};

module.exports = {
  usuariosPost,
};
