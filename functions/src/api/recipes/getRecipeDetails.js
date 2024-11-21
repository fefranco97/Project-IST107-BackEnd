const { onRequest } = require('firebase-functions/v2/https')
const { db } = require('../../config/db')

const GetRecipeDetails = onRequest(async (req, res) => {
  const { id } = req.query

  try {
    const recipeDoc = await db.collection('recipes').doc(id).get()
    if (!recipeDoc.exists) {
      res.status(404).send('Recipe not found')
      return
    }
    res.status(200).json({ id: recipeDoc.id, ...recipeDoc.data() })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = { GetRecipeDetails }
