const { onRequest } = require('firebase-functions/v2/https')
const { db } = require('../../config/db')

const GetAllRecipes = onRequest(async (req, res) => {
  try {
    const snapshot = await db.collection('recipes').get()
    const recipes = snapshot.docs.map((doc) => ({ id: doc.uid, ...doc.data() }))
    res.status(200).json(recipes)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = { GetAllRecipes }
