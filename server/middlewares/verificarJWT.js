const jwt = require("jsonwebtoken");
const Usuario = require("../models/User");

const verificarJWT = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({
      msg: "El token no es valido",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET);

    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        msg: "El token no es valido",
      });
    }
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "El token no es valido",
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(401).json({
      msg: "El token no es valido",
    });
  }
};

module.exports = {
  verificarJWT,
};
