const { response } = require("express");

const login = (req, res = response) => {
  res.json({
    msg: "login ok",
  })
}

const googleSignIn = (req, res = response) => {
  res.json({
    msg: "google ok",
  })
}

module.exports = {
  login,
  googleSignIn
}