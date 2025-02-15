const Joi = require("joi");
const mongoose = require("mongoose");

// 📌 Schéma Mongoose
const postSchema = new mongoose.Schema({
  lieu: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  group: {
    type: String,
    default: false,
  },
  photo: {
    type: String, // 📌 Doit être une chaîne (URL de l’image), pas un nombre !
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 📌 Modèle Mongoose
const Post = mongoose.model("Post", postSchema);

// 📌 Fonction de validation avec Joi
function validatePost(post) {
  const schema = Joi.object({
    lieu: Joi.string().min(2).max(250).required(),
    description: Joi.string().max(500).allow("", null),
    group: Joi.string(),
    photo: Joi.string().required(), 
  });

  return schema.validate(post);
}

// 📌 Exportation correcte
module.exports = { Post, validatePost };
