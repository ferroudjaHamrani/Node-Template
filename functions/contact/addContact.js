const { Contact, validateContact } = require("../../models/contact");

const addContact = async (req, res) => {
  // Validation des données envoyées par l'utilisateur
  const { error } = validateContact(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    // Création d'un nouvel objet Contact
    const newContact = new Contact(req.body);
    await newContact.save();

    res.status(201).json({ success: true, message: "Contact ajouté avec succès !" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

module.exports = addContact;
