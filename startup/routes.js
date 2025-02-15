const express = require("express");

const error = require("../middleware/error");
const media = require("../routes/media");
const auth = require("../routes/auth");
const post = require("../routes/post");
const contact =  require ("../routes/contact")
const event =  require ("../routes/event")
module.exports = function (app) {
  app.use(express.json());
   app.use("/static", express.static("public"));
  app.use("/media", media);
  app.use("/auth", auth);
  app.use("/post", post);
  app.use("/contact", contact);
  app.use("/event", event);
  app.use(error);
};
