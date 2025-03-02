const { onRequest } = require("firebase-functions/v2/https");
const { db } = require("../../config/db");
const corsHandler = require("../../config/cors");

const GetRecipeDetails = onRequest((req, res) => {
  corsHandler(req, res, async () => {
    const { id } = req.query;
    try {
      const recipeDoc = await db.collection("recipes").doc(id).get();
      if (!recipeDoc.exists) {
        res.status(404).send("Recipe not found");
        return;
      }
      res.status(200).json({ status: "success", data: recipeDoc.data() });
    } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
    }
  });
});

module.exports = { GetRecipeDetails };
