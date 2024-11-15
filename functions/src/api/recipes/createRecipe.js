const { onRequest } = require("firebase-functions/v2/https");
const { db, admin } = require("../../config/db");

const CreateRecipe = onRequest(async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  try {
    const recipeRef = await db.collection("recipes").add({
      title,
      ingredients,
      instructions,
      createdAt: Date.now(),
    });
    res.status(201).json({ id: recipeRef.id });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = { CreateRecipe };
