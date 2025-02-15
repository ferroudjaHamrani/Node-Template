const { User, validateUser } = require("../../models/user");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
 
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const { nom, prenom, email, password } = req.body;

   
    let existingUser = await User.findOne({ email: email.trim() });
    if (existingUser)
      return res.status(400).send({ message: "Cet email est déjà utilisé." });

  
    const newUser = new User({
      nom,
      prenom,
      email: email.trim(),
      password,
    });

    await newUser.save();

  
    const token = newUser.generateAuthToken();

    res.status(201).send({ success: true, token, message: "Inscription réussie" });
  } catch (err) {
    res.status(500).send({ message: "Erreur serveur", error: err.message });
  }
};

module.exports = signup;
