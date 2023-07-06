const configurar = () => {
  // ============================
  //  Puerto
  // ============================
  process.env.PORT = process.env.PORT || 3000;

  // ============================
  //  Entorno
  // ============================
  process.env.NODE_ENV = process.env.NODE_ENV || "dev";

  // ============================
  //  Base de datos
  // ============================
  const devDB = "mongodb://127.0.0.1:27017/chatEpico"; // cambiar por la base de datos de desarrollo
  const prodDB = ""; // cambiar por la base de datos de produccion

  process.env.MONGODB_CNN = process.env.NODE_ENV === "dev" ? devDB : prodDB;

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
