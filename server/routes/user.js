const { Router } = require("express");

// fucniones de los middlewares (comprobaciones)
const { check } = require("express-validator");
const { validarCampos } = require("../helpers/verificarCampos");
const { emailRepetido, usuarioExiste } = require("../database/db-validators");

// functiones de los controllers
const { usuariosPost } = require("../controllers/user");
const { verificarJWT } = require("../middlewares/verificarJWT");
const { verificarAdmin } = require("../middlewares/verificarRoles");

const router = Router();

router.post(
  "/postUser",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("correo").custom(emailRepetido),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    check(
      "password",
      "La contraseña debe tener al menos un numero y una mayuscula"
    ).matches(/^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{6,}$/),
    validarCampos,
  ],
  usuariosPost
);

router.delete(
  "/deleteUser",
  [
    verificarJWT,
    verificarAdmin,
    check("uid", "El uid es obligatorio").not().isEmpty(),
    check("uid", "El uid no es valido").isMongoId(),
    check("uid", "El usuario no existe").custom(usuarioExiste),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
