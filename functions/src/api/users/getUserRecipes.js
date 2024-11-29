const { onRequest } = require('firebase-functions/v2/https')
const { db } = require('../../config/db')
const corsHandler = require('../../config/cors')

const GetUserRecipes = onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'GET') {
      res.status(405).send('Method Not Allowed')
    }
    const { userId } = req.query

    try {
      const snapshot = await db.collection('recipes').where('user', '==', userId).get()
      const userRecipes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      res.status(200).send({ status: 'success', data: userRecipes })
    } catch (error) {
      res.status(500).send(error.message)
    }
  })
})

module.exports = { GetUserRecipes }
