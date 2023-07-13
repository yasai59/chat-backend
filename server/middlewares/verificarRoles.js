const verificarAdmin = async (req, res, next) => {
  const { usuario: user } = req;

  if (user.rol === "ADMIN_ROLE") {
    next();
  } else {
    return res.status(401).json({
      msg: "El usuario no es administrador",
    });
  }
};

const tieneRol = (...roles) => {
  const verificarRol = (req, res, next) => {
    const { usuario } = req;
    if (!roles.includes(usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`,
      });
    }
    next();
  };
  return verificarRol;
};

module.exports = {
  verificarAdmin,
  tieneRol,
};
