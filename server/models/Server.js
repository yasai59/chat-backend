// importaciones de paquetes de terceros
const express = require("express");
const cors = require("cors");
require("colors");

// importacion de mis ficheros
const { conexionBD } = require("../database/config");

class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT;

    this.apiPath = "/api";
    this.authPath = "/auth";
    this.userPath = "/user";

    // conectamos a la base de datos
    this.dbConnection();
    // cargamos middlewares y rutas
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // directorio publico
    this.app.use(express.static(`${__dirname}/../public`));

    // lectura y parseo del body
    this.app.use(express.json());
  }

  routes() {

    // rutas de la API
    this.app.use(this.apiPath, require("../routes/api"));

    // rutas de autenticacion
    this.app.use(this.authPath, require("../routes/auth"));

    // rutas de usuarios
    this.app.use(this.userPath, require("../routes/user"));
  }

  // metodo para conectar a la base de datos
  async dbConnection() {
    conexionBD();
  }
  // metodo para hacer que el servidor escuche por el puerto
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port} 🚀`);
    });
  }
}

module.exports = Server;
