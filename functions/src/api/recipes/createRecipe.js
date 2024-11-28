const { onRequest } = require('firebase-functions/v2/https')
const { db } = require('../../config/db')
const corsHandler = require('../../config/cors')

const CreateRecipe = onRequest((req, res) => {
  corsHandler(req, res, async () => {
    const { title, ingredients, instructions, short, user, img } = req.body
    try {
      const recipeRef = await db.collection('recipes').add({
        title,
        ingredients,
        instructions,
        short,
        user,
        img,
      })
      res.status(201).json({ status: 'success', data: recipeRef.id })
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message })
    }
  })
})

module.exports = { CreateRecipe }
