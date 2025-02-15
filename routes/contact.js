const express = require("express");
const {
  addContact,
  getAllContact

} = require("../functions/contact");
const authOnly = require("../middleware/authOnly");

const router = express.Router();

router.get("/getAllContact",  getAllContact);
router.post("/addContact", addContact );

module.exports = router;