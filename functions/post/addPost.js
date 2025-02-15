const { Form, validateForm } = require("../../models/form");

const addPost = async (req, res) => {
  
  const { error } = validateForm(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    
    const newForm = new Form(req.body);
    await newForm.save();
    res.status(201).json({ success: true, message: "Formulaire soumis avec succès !" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

module.exports = addPost;
