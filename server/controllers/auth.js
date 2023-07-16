const { response } = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/User");

const login = async (req, res = response) => {
  const { correo, password } = req.body;
  const usuario = await Usuario.findOne({ correo });
  // comprobamos si el usuario existe
  if (!usuario) {
    return res.status(400).json({
      msg: "Usuario / Password no son correctos",
    });
  }
  // comprobamos si el usuario esta activo
  if (!usuario.estado) {
    return res.status(400).json({
      msg: "Usuario / Password no son correctos",
    });
  }
  // comprobamos si el usuario esta activado
  if (!usuario.activado) {
    return res.status(400).json({
      msg: "El usuario no esta activado",
    });
  }
  // comprobamos si la contraseña es correcta
  const validPassword = bcryptjs.compareSync(password, usuario.password);
  if (!validPassword) {
    return res.status(400).json({
      msg: "Usuario / Password no son correctos",
    });
  }

  // generamos el JWT
  const token = jwt.sign({ correo: usuario.correo }, process.env.SECRET, {
    expiresIn: "7d",
  });

  res.json({
    msg: "login ok",
    token,
    usuario,
  });
};

const googleSignIn = (req, res = response) => {
  res.json({
    msg: "google ok",
  });
};

module.exports = {
  login,
  googleSignIn,
};
