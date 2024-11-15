const { onRequest } = require('firebase-functions/v2/https')
const { db } = require('../../config/db')

const GetAllIngredients = onRequest(async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed')
  }
  try {
    const ingredientsSnapshot = await db.collection('ingredients').get()
    const ingredients = ingredientsSnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() }
    })
    res.status(200).json(ingredients)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = { GetAllIngredients }
