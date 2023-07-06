const {Router} = require('express');

const router = Router();

const { usuariosPost } = require('../controllers/user');
const { check } = require('express-validator');
const { validarCampos } = require('../helpers/verificarCampos');

router.post('/postUser',[
  check('nombre','El nombre es obligatorio').not().isEmpty(),
  check('correo','El correo es obligatorio').isEmail(),
  check('password','La contraseña es obligatoria').not().isEmpty(), 
  validarCampos
], usuariosPost)


module.exports = router;