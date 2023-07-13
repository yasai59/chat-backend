const { Request, Response } = require("express");
const Usuario = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usuariosPost = (req = Request, res = Response) => {
  // recojemos los datos del body
  const { body } = req;
  const { nombre, correo, password, imagen } = body;

  // creamos la instancia del usuario
  const usuario = new Usuario({ nombre, correo, password, imagen });

  // Encriptamos la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // guardamos el usuario en la base de datos
  usuario.save();

  // generamos el JWT
  const token = jwt.sign({ correo: usuario.correo }, process.env.SECRET, {
    expiresIn: "7d",
  });

  // damos una respuesta al frontend
  res.json({
    msg: "postUser ok",
    usuario,
    token,
  });
};

module.exports = {
  usuariosPost,
};
