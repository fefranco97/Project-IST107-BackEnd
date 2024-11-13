const { onRequest } = require('firebase-functions/v2/https')
const logger = require('firebase-functions/logger')
const { createUserWithEmailAndPassword } = require('../firestore/userCollection')

const CreateUser = onRequest((request, response) => {
  if (request.method !== 'POST') {
    logger.error('Method Not Allowed')
    response.status(405).send('Method Not Allowed')
    return
  }

  const { name, email, password } = request.body

  if (!email || !password) {
    response.status(400).send('Email and password are required')
    return
  }

  createUserWithEmailAndPassword(name, email, password)
    .then((user) => {
      response.status(201).json(user)
    })
    .catch((error) => {
      logger.error('Error creating user:', error)
      response.status(500).send(error.message)
    })
})

module.exports = { CreateUser }
