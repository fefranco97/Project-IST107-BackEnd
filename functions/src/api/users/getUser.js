const { onRequest } = require('firebase-functions/v2/https')
const { db } = require('../../config/db')
const corsHandler = require('../../config/cors')

const GetUserByEmail = onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const { email } = req.query

    try {
      const usersCol = await db.collection('users').where('email', '==', email).get()
      const user = usersCol.docs.map((doc) => ({ id: doc.uid, ...doc.data() }))
      res.status(200).send({ status: 'success', data: user })
    } catch (error) {
      res.status(500).send(error.message)
    }
  })
})
module.exports = { GetUserByEmail }
