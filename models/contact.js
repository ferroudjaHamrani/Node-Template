const Joi = require("joi");
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  nom_complet: {
    type: String,
    required: true,
    trim: true,
  },
  tel: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

function validateContact(data) {
  const schema = Joi.object({
    nom_complet: Joi.string().max(250).required(),
    tel: Joi.string().allow("", null),
    description: Joi.string().max(500).allow("", null),
  });

  return schema.validate(data);
}

module.exports = { Contact, validateContact };
