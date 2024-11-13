const admin = require('firebase-admin')
const logger = require('firebase-functions/logger')

async function createUser(user) {
  const db = admin.firestore()
  const userRef = db.collection('users').doc(user.uid)
  await userRef.set(user)
  logger.info(`User ${user.uid} created`)
}

async function getUserByUID(uid) {
  const db = admin.firestore()
  const userRef = db.collection('users').doc(uid)
  const user = await userRef.get()
  if (!user.exists) {
    return null
  } else {
    return user.data()
  }
}

async function getUserByEmail(email) {
  const db = admin.firestore()
  const userRef = db.collection('users').doc(email)
  const user = await userRef.get()
  if (!user.exists) {
    return null
  } else {
    return user.data()
  }
}

async function updateUser(user) {
  const db = admin.firestore()
  const userRef = db.collection('users').doc(user.uid)
  await userRef.update(user)
  logger.info(`User ${user.uid} updated`)
}

async function createUserWithEmailAndPassword(name, email, password) {
  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    })
    const user = {
      uid: userRecord.uid,
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

async function deleteUser(recipeId) {
  const db = admin.firestore()
  const recipeRef = db.collection('recipes').doc(recipeId)
  await recipeRef.delete()
  logger.info(`Recipe ${recipeId} deleted`)
}

module.exports = { getUserByUID, getUserByEmail, updateUser, createUserWithEmailAndPassword, deleteUser }
