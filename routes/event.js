const express = require("express");
const {
  getAllevent,
  addEvent,

} = require("../functions/event");
const authOnly = require("../middleware/authOnly");

const router = express.Router();

router.get("/getALLevent",  getAllevent,);
router.post("/addEvent",   addEvent);

module.exports = router;