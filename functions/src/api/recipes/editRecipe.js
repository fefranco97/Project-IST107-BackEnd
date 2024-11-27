const { onRequest } = require('firebase-functions/v2/https')
const logger = require('firebase-functions/logger')
const { db } = require('../../config/db')
const corsHandler = require('../../config/cors')

const EditRecipe = onRequest((req, res) => {
  corsHandler(req, res, async () => {
    const { id, title, ingredients, instructions } = req.body
    try {
      await db.collection('recipes').doc(id).update({
        title,
        instructions,
        short,
        img,
      })
      res.status(200).send({ status: 'success', message: 'Recipe updated successfully' })
    } catch (error) {
      res.status(500).send({ status: 'error', message: error.message })
    }
  })
})

module.exports = { EditRecipe }
