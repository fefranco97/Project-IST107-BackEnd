const { onRequest } = require('firebase-functions/v2/https')
const { db } = require('../../config/db')

const GetAllUsers = onRequest(async (req, res) => {
  try {
    const usersCol = await db.collection('users').get()
    const users = usersCol.docs.map((doc) => ({ id: doc.uid, ...doc.data() }))
    res.status(200).json(users)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

const GetUserByEmail = onRequest(async (req, res) => {
  const { email } = req.query

  try {
    const usersCol = await db.collection('users').where('email', '==', email).get()
    const user = usersCol.docs.map((doc) => ({ id: doc.uid, ...doc.data() }))
    res.status(200).json(user)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

const GetUserByGoogle = onRequest(async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed')
  }

  const { idToken } = req.query

  if (!idToken) {
    return res.status(400).send('ID Token is required')
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken)

    const { uid, email, name, picture } = decodedToken
    const userRef = db.collection('users').doc(uid)
    const userSnap = await userRef.get()

    if (!userSnap.exists) {
      await userRef.set({
        id: crypto.randomUUID(),
        email: email,
        name: name,
        photoURL: picture,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      })
      return res.status(201).send('User created')
    } else {
      return res.status(200).send('User already exists')
    }
  } catch (error) {
    console.error('Error verifying ID token or creating user:', error)
    res.status(500).send('Error creating user')
  }
})

module.exports = { GetAllUsers, GetUserByEmail, GetUserByGoogle }
