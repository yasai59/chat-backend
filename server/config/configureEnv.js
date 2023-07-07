const configurar = () => {

  const devDB = "mongodb://127.0.0.1:27017/chatEpico"; // cambiar por la base de datos de desarrollo
  const prodDB = "";                                   // cambiar por la base de datos de produccion

  const defaultPort = 3000;

  // ============================
  //  Puerto
  // ============================
  process.env.PORT = process.env.PORT || defaultPort;

  // ============================
  //  Entorno
  // ============================
  process.env.NODE_ENV = process.env.NODE_ENV || "dev";

  // ============================
  //  Base de datos
  // ============================

  process.env.MONGODB_CNN = process.env.NODE_ENV === "dev" ? devDB : prodDB;

  if(!process.env.SECRET || process.env.SECRET === ""){
    throw new Error("La variable de entorno SECRET es obligatoria 💣")
  }

  // ============================
  //  Mostrar mensajes en consola
  // ============================

  if (process.env.VERBOSE === "true") {
    console.log("tu configuracion de entorno es:");
    console.log({
      PORT: process.env.PORT,
      NODE_ENV: process.env.NODE_ENV,
      MONGODB_CNN: process.env.MONGODB_CNN,
      VERBOSE: process.env.VERBOSE,
    });
  }
};


module.exports = { configurar };
