const { response } = require("express");

const login = async(req, res = response) => {
  const { correo, password } = req.body;
  const usuario = await Usuario.findOne({ correo });
  // comprobamos si el usuario existe
  if (!usuario) {
    return res.status(400).json({
      msg: "Usuario / Password no son correctos - correo",
    });
  }
  // comprobamos si el usuario esta activo
  if (!usuario.estado) {
    return res.status(400).json({
      msg: "Usuario / Password no son correctos - estado: false",
    });
  }
  // comprobamos si la contraseña es correcta
  const validPassword = bcryptjs.compareSync(password, usuario.password);
  if (!validPassword) {
    return res.status(400).json({
      msg: "Usuario / Password no son correctos - password",
    });
  }

  res.json({
    msg: "login ok",
  })
}

const googleSignIn = (req, res = response) => {
  res.json({
    msg: "google ok",
  })
}

module.exports = {
  login,
  googleSignIn
}