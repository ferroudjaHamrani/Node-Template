const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

module.exports = async function (logger) {
  const dbURI = config.get("db"); 

  let loaded = false;

  while (!loaded) {
    try {
      await mongoose
        .connect(dbURI)
        .then(() => {
          loaded = true;
          logger.info(`✅ Connecté à MongoDB`);
        });
    } catch (error) {
      logger.error(`❌ Erreur de connexion à MongoDB :`, error);
      logger.info(`🔄 Retente la connexion...`);
    }
  }
};
