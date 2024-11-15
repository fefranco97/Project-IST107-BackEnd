const { onRequest } = require("firebase-functions/v2/https");
const db = require("../../config/db");

const GetUserRecipes = onRequest(async (req, res) => {
  const { userId } = req.query;
  try {
    const snapshot = await db
      .collection("recipes")
      .where("userId", "==", userId)
      .get();
    const userRecipes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(userRecipes);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = { GetUserRecipes };
