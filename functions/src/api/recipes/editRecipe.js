const { onRequest } = require('firebase-functions/v2/https')
const logger = require('firebase-functions/logger')
const { db } = require('../../config/db')

const EditRecipe = onRequest(async (req, res) => {
  const { id, title, ingredients, instructions } = req.body
  try {
    await db.collection('recipes').doc(id).update({
      title,
      instructions,
      short,
    });
    res.status(200).send("Recipe updated successfully");
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = { EditRecipe }
