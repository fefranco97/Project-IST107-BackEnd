const { onRequest } = require('firebase-functions/v2/https')
const logger = require('firebase-functions/logger')
const { admin, db } = require('../../config/db')

async function createUser(user) {
  const userRef = db.collection('users').doc(user.id)
  await userRef.set(user)
  logger.info(`User ${user.id} created`)
}

async function createUserWithEmailAndPassword(name, email, password) {
  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    })
    const user = {
      id: crypto.randomUUID(),
      email: userRecord.email,
      name: name,
      createdAt: new Date().toISOString(),
    }
    await createUser(user)
    return user
  } catch (error) {
    logger.error('Error creating new user:', error)
    throw error
  }
}

const CreateUser = onRequest((request, response) => {
  corsHandler(req, res, async () => {
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
        response.status(201).json({ status: 'success', ...user })
      })
      .catch((error) => {
        logger.error('Error creating user:', error)
        response.status(500).send({ status: 'error', message: error.message })
      })
  })
})

module.exports = { CreateUser }
