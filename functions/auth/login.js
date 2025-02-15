const { User } = require("../../models/user");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email et mot de passe sont requis." });
    }

    let emailVerified = email.trim(); // Supprime les espaces

    // Utiliser `User.findOne`, pas `User.Handle.findOne`
    const user = await User.findOne({ email: emailVerified }).select("password");

    if (!user) {
      return res.status(404).json({ success: false, message: "Email ou mot de passe incorrect." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ success: false, message: "Email ou mot de passe incorrect." });
    }

    let token = await user.generateAuthToken();

    res.json({ success: true, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

module.exports = login;
