const { onRequest } = require('firebase-functions/v2/https')
const logger = require('firebase-functions/logger')
const { firestore } = require('firebase-admin')

const GetAllRecipes = onRequest(async (request, response) => {
  logger.info('Hello logs!', { structuredData: true })

  response.send('Create Recipe')
})

module.exports = { GetAllRecipes }
