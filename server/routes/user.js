const {Router} = require('express');

// fucniones de los middlewares (comprobaciones)
const { check } = require('express-validator');
const { validarCampos } = require('../helpers/verificarCampos');
const { emailRepetido } = require('../database/db-validators');

// functiones de los controllers
const { usuariosPost } = require('../controllers/user');

const router = Router();

router.post('/postUser',[
  check('nombre','El nombre es obligatorio').not().isEmpty(),
  check('correo','El correo es obligatorio').isEmail(),
  check('password','La contraseña es obligatoria').not().isEmpty(), 
  check('correo').custom(emailRepetido),  
  validarCampos
], usuariosPost)


module.exports = router;