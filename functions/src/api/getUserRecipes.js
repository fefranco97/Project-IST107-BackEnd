const { onRequest } = require('firebase-functions/v2/https')
const logger = require('firebase-functions/logger')

const GetUserRecipes = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true })
  response.send('Create Recipe')
})

module.exports = { GetUserRecipes }