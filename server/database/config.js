const mongoose = require("mongoose");

const conexionBD = async () => {
  try {
    // aqui esperamos a que la base de datos se conecte
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console log con el mensaje de que la base de datos esta online y el emoji de un ordenador
    console.log("Conectado con la base de datos ".rainbow + "💻");
  } catch (error) {
    if (process.env.VERBOSE === "true") {
      // console log con el error que nos da la base de datos y un emoji triste
      console.log(error, "💔");
    }
    // console log con el mensaje de que la base de datos esta offline y un emoji triste
    throw new Error("Error a la hora de iniciar la base de datos 💔");
  }
};

module.exports = {
  conexionBD,
};
