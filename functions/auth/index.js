const login = require("./login");
const validate = require("./validate");
const signup= require("./signup")
const authFunctions = {
  login,
  validate,
  signup,
};

module.exports = authFunctions;
