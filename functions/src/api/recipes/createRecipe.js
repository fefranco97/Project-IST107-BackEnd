const { onRequest } = require('firebase-functions/v2/https')
const { Storage } = require('@google-cloud/storage')
const { db, admin } = require('../../config/db')
const corsHandler = require('../../config/cors')
const formidable = require('formidable-serverless')
const UUID = require('uuid-v4')

const CreateRecipe = onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ status: 'error', message: 'Method not allowed' })
    }

    const storage = new Storage()
    const userRef = db.collection('recipes')

    const form = new formidable.IncomingForm({ multiples: true })
    try {
      form.parse(req, async (err, fields, files) => {
        let uuid = UUID()
        var downLoadPath = 'https://firebasestorage.googleapis.com/v0/b/projectrecipesist107.firebasestorage.app/o/'

        const recipeImg = files.img
        let imageUrl
        const docID = userRef.doc().id

        if (err) {
          return res.status(400).json({
            status: 'Bad Request',
            message: 'There was an error parsing the files',
            data: {},
            error: err,
          })
        }
        const bucket = storage.bucket('gs://projectrecipesist107.firebasestorage.app')

        if (recipeImg.size == 0) {
        } else {
          const imageResponse = await bucket.upload(recipeImg.path, {
            destination: `images/${recipeImg.name}`,
            resumable: true,
            metadata: {
              metadata: {
                firebaseStorageDownloadTokens: uuid,
              },
            },
          })
          imageUrl = downLoadPath + encodeURIComponent(imageResponse[0].name) + '?alt=media&token=' + uuid
        }

        const recipeModel = {
          id: docID,
          title: fields.title,
          ingredients: JSON.parse(fields.ingredients),
          instructions: fields.instructions,
          short: fields.short,
          user: fields.user,
          img: recipeImg.size == 0 ? '' : imageUrl,
        }

        await userRef
          .doc(docID)
          .set(recipeModel, { merge: true })
          .then((value) => {
            res.status(200).send({
              status: 'success',
              message: 'Recipe created successfully',
              data: recipeModel,
              error: {},
            })
          })
      })
    } catch (err) {
      res.send({
        status: 'error',
        message: 'Something went wrong',
        data: {},
        error: err,
      })
    }
  })
})

module.exports = { CreateRecipe }
