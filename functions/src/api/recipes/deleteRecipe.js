const { onRequest } = require('firebase-functions/v2/https')
const logger = require('firebase-functions/logger')
const { db } = require('../../config/db')

const DeleteRecipe = onRequest(async (req, res) => {
  const { id } = req.query
  try {
    await db.collection('recipes').doc(id).delete()
    res.status(200).send('Recipe deleted successfully')
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = { DeleteRecipe }
