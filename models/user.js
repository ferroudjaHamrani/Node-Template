const Joi = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Empêche l'affichage par défaut du password
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 🔹 Hash du password avant l'enregistrement
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔹 Génération du token JWT
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
    },
    config.get("jwtPrivateKey"),
    { expiresIn: "7d" }
  );
};

const User = mongoose.model("User", userSchema);


function validateUser(user) {
  const schema = Joi.object({
    nom: Joi.string().max(250).required(),
    prenom: Joi.string().max(250).required(),
    email: Joi.string().email().max(250).required(),
    password: Joi.string().min(6).max(300).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
      "any.only": "Les mots de passe ne correspondent pas.",
    }),
  });

  return schema.validate(user);
}

module.exports = { User, validateUser };
