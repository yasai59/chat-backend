const { Request, Response } = require("express");
const Usuario = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generarJWT } = require("../helpers/generar-token");

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
  const token = generarJWT(usuario._id);

  // damos una respuesta al frontend
  res.json({
    msg: "postUser ok",
    usuario,
    token,
  });
};

const usuariosDelete = async (req = Request, res = Response) => {
  // recojemos los datos del body
  const { body } = req;
  const { uid } = body;
  // borramos el usuario de la base de datos
  const usuario = await Usuario.findByIdA(uid);
  if (!usuario) {
    return res.status(400).json({
      msg: "El usuario no existe",
    });
  }
  usuario.estado = false;
  usuario.save();
  // damos la respuesta al frontend
  res.json({
    msg: "deleteUser ok",
  });
};

module.exports = {
  usuariosPost,
  usuariosDelete,
};
