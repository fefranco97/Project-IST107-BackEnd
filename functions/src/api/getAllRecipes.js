const { onRequest } = require('firebase-functions/v2/https')
const logger = require('firebase-functions/logger')
const { database } = require('../config/firebase')

const GetAllRecipes = onRequest(async (request, response) => {
  logger.info('Hello logs!', { structuredData: true })

  const { name, description, ingredients, steps, image } = request.body

  const userCollection = collection(database, 'User')
  const userSnapshot = await getDocs(userCollection)
  const userList = userSnapshot.docs.map((doc) => doc.data())

  console.log(userList)

  response.send('Create Recipe')
})

module.exports = { GetAllRecipes }
