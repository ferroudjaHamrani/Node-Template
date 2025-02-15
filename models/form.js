const Joi = require("joi");
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true,
  },
  prenom: {
    type: String,
    required: true,
    trim: true,
  },
  tel: {
    type: String,
    trim: true,
  },
  date_dernier_don: {
    type: Date, 
    default: null,
  },
  wilaya: {
    type: String,
    trim: true,
  },
  commune: {
    type: String,
    trim: true,
  },
  groupage: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Form = mongoose.model("Form", commentSchema);

function validateForm(data) {
  const schema = Joi.object({
    nom: Joi.string().max(250).required(),
    prenom: Joi.string().max(250).required(),
    tel: Joi.string().allow("", null),
    date_dernier_don: Joi.date().allow(null), 
    wilaya: Joi.string().max(500).allow("", null),
    commune: Joi.string().max(500).allow("", null),
    groupage: Joi.string().max(500).allow("", null),
  });

  return schema.validate(data);
}

module.exports = { Form, validateForm };
