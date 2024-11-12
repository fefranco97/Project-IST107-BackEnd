const { onRequest } = require('firebase-functions/v2/https')
const logger = require('firebase-functions/logger')

const UpdateRecipe = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true })
  response.send('Create Recipe')
})

module.exports = { UpdateRecipe }
