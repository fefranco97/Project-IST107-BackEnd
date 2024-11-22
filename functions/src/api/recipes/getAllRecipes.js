const { onRequest } = require("firebase-functions/v2/https");
const { db } = require("../../config/db");

const GetAllRecipes = onRequest(async (req, res) => {
  try {
    const snapshot = await db
      .collection("recipes")
      .select("title", "short", "img")
      .get();
    const recipes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json({ status: "success", data: recipes });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

module.exports = { GetAllRecipes };
