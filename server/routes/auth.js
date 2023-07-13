const { Router } = require("express");

const { login, googleSignIn } = require("../controllers/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../helpers/verificarCampos");
const router = Router();

router.post(
  "/login",
  [check("correo", "El correo es obligatorio").isEmail(), validarCampos],
  login
);

router.post("/google", googleSignIn);

module.exports = router;
