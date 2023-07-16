const { Request, Response } = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/User");
const { generarJWT } = require("../helpers/generar-token");
const { transporter } = require("../mail/mailer");

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

  // enviamos un correo de verificacion
  transporter.sendMail({
    from: "Servidor Node.js",
    to: correo,
    subject: "Verificacion de correo",
    html: `<h1>Verifica tu correo</h1>
    <a href="${process.env.PUBLIC_ADDRESS}/verificar?user=${usuario._id}">Verificar</a>`,
  });

  // generamos el JWT
  const token = generarJWT(usuario._id);

  // damos una respuesta al frontend
  res.json({
    msg: "postUser ok",
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

const verificarUsuario = async (req, res) => {
  const uid = req.params.id;
  if (!uid) {
    return res.status(400).json({
      msg: "El usuario no existe",
    });
  }
  // comprobamos si el uid es de un usuario
  const usuario = await Usuario.findById(uid);
  if (!usuario) {
    return res.status(400).json({
      msg: "El usuario no existe",
    });
  }

  // comprobamos si el usuario esta activado
  if (usuario.activado) {
    return res.status(400).json({
      msg: "El usuario ya esta activado",
    });
  }

  // activamos el usuario
  usuario.activado = true;
  usuario.save();

  // generamos el JWT
  const token = generarJWT(usuario._id);

  // damos una respuesta al frontend
  res.json({
    msg: "verificar ok",
    usuario,
    token,
  });
};

module.exports = {
  usuariosPost,
  usuariosDelete,
  verificarUsuario,
};
