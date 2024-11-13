const { onRequest } = require('firebase-functions/v2/https')
const logger = require('firebase-functions/logger')

const CreateRecipe = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true })
  const { name, description, ingredients, steps, image } = request.body
  logger.info('Name:', name)
  response.send('Create Recipe')
})

module.exports = { CreateRecipe }
