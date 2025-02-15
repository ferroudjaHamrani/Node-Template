const express = require("express");
const {
  GetPost,
  addPost

} = require("../functions/post");
const authOnly = require("../middleware/authOnly");

const router = express.Router();

router.get("/GetPost", GetPost);
router.post("/addPost", addPost);

module.exports = router;