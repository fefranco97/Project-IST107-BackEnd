const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { db } = require("../../config/db");
const corsHandler = require("../../config/cors");

const DeleteRecipe = onRequest((req, res) => {
  corsHandler(req, res, async () => {
    const { id } = req.query;
    try {
      await db.collection("recipes").doc(id).delete();
      res
        .status(200)
        .send({ status: "success", data: "Recipe deleted successfully" });
    } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
    }
  });
});

module.exports = { DeleteRecipe };
