const {Schema, model} = require('mongoose');


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    imagen: {
        type: String,
        required: false,
        default: ''
    },
    rol: {
        type: String,
        required: true,
        // enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    amigos: {
        type: Array,
        required: false,
        default: []
    },
    bloqueados: {
        type: Array,
        required: false,
        default: []
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false,
        required: false
    },
    fecha: {
        type: Date,
        default: Date.now()
    },
});

// sobreescribimos el metodo toJSON para que no nos devuelva el password y el __v
UsuarioSchema.methods.toJSON = function(){
    const {__v, password, ...usuario} = this.toObject();
    return usuario;
}

// exportamos el modelo
module.exports = model('Usuario', UsuarioSchema);