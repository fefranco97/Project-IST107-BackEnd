const { onRequest } = require('firebase-functions/v2/https')
const { admin, db } = require('../../config/db')

const LoginWithGoogle = onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed')
  }
  const { token } = req.body

  if (!token) {
    return res.status(400).send('ID Token is required')
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token)

    const { uid, email, name, picture } = decodedToken
    const userRef = db.collection('users').doc(uid)
    const userSnap = await userRef.get()

    if (!userSnap.exists) {
      await userRef.set({
        id: crypto.randomUUID(),
        email: email,
        name: name,
        photoURL: picture,
      })
      return res.status(201).send({ status: 'success', message: 'User created' })
    } else {
      return res.status(200).send({ status: 'success', message: 'User created' })
    }
  } catch (error) {
    console.error('Error verifying ID token or creating user:', error)
    res.status(500).send({ status: 'error', message: 'Error creating user' })
  }
})

module.exports = { LoginWithGoogle }
