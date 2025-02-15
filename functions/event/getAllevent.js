const { Post } = require("../../models/post");

const getAllevent = async (req, res) => {
  try {
    const count = await Post.countDocuments({});
    const results = await Post.find({})
      .sort({ createdAt: -1 }) // Trier du plus récent au plus ancien
      .skip(req.body.skip ? req.body.skip : 0)
      .limit(req.body.limit ? req.body.limit : 10); // Par défaut, limite à 10

    res.status(200).json({ count, results });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

module.exports = getAllevent;
