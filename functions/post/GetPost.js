const { Form } = require("../../models/form");

const GetPost = async (req, res) => {
  try {
    const count = await Form.countDocuments({});
    const results = await Form.find({})
      .sort({ createdAt: -1 }) // Trier par date de création (du plus récent au plus ancien)
      .skip(req.body.skip ? req.body.skip : 0)
      .limit(req.body.limit ? req.body.limit : 10); // Par défaut, limiter à 10 résultats

    res.status(200).json({ count, results });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

module.exports = GetPost;
