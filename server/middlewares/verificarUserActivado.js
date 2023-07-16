const Usuario = require("../models/usuario");

const verificarUserActivado = async (req, res, next) => {
  const uid = req.usuario._id;

  if (!uid) {
    return res.status(500).json({
      msg: "Se quiere verificar el usuario sin tener un token",
    });
  }

  try {
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        msg: "Usuario no existe",
      });
    }
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Usuario no existe",
      });
    }

    next();
  } catch (e) {
    res.status(401).json({
      msg: "Usuario no existe",
    });
  }
};

module.exports = {
  verificarUserActivado,
};
