const express = require("express");
const {signup, login, validate,  } = require("../functions/auth");

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/validate", validate);


module.exports = router;
