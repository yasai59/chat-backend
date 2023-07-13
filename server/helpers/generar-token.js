const jwt = require("jsonwebtoken");

const generarJWT = (uid = "") => {
  const token = jwt.sign({ uid }, process.env.SECRET, {
    expiresIn: "7d",
  });

  return token;
};

module.exports = {
  generarJWT,
};
