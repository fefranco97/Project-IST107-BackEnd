const { onRequest } = require('firebase-functions/v2/https')
const { admin, db } = require('../../config/db')
const corsHandler = require('../../config/cors')
const crypto = require('crypto')

const LoginWithGoogle = onRequest((req, res) => {
  corsHandler(req, res, async () => {
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

        const newUser = await userRef.get()
        return res.status(201).send({ status: 'success', message: 'User created', user: newUser.data() })
      } else {
        return res.status(200).send({ status: 'success', message: 'User created', user: userSnap.data() })
      }
    } catch (error) {
      console.error('Error verifying ID token or creating user:', error)
      res.status(500).send({ status: 'error', message: 'Error creating user' })
    }
  })
})

module.exports = { LoginWithGoogle }
