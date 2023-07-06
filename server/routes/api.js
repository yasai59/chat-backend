const { Router } = require("express");
const { signUp } = require("../controllers/api");

const router = Router();


router.get('/ping', (req, res) => {
  res.json({
    msg: "pong"
  })
})


module.exports = router;