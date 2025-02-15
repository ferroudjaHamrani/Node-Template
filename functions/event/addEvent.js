const { Post, validatePost } = require("../../models/post");

const addEvent = async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newEvent = new Post(req.body);
    await newEvent.save();
    res.status(201).json({ success: true, message: "Événement ajouté avec succès !" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

module.exports = addEvent;
