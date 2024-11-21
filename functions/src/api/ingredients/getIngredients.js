const { onRequest } = require("firebase-functions/v2/https");
const { db } = require("../../config/db");

const GetIngredients = onRequest(async (req, res) => {
  try {
    const snapshot = await db.collection("ingredients").get();

    const recipes = snapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = { GetIngredients };
