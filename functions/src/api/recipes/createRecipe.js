const { onRequest } = require('firebase-functions/v2/https')
const { db, storage } = require('../../config/db')
const corsHandler = require('../../config/cors')
const Busboy = require('busboy')

const CreateRecipe = onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ status: 'error', message: 'Método não permitido.' })
    }

    const busboy = new Busboy({ headers: req.headers })
    const recipeData = {}
    let imageFile

    busboy.on('field', (fieldname, value) => {
      recipeData[fieldname] = fieldname === 'ingredients' ? JSON.parse(value) : value
    })

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      if (fieldname === 'img') {
        const bucket = storage.bucket()
        const filePath = `recipes/${Date.now()}_${filename}`
        const fileUpload = bucket.file(filePath)

        const writeStream = fileUpload.createWriteStream({
          metadata: { contentType: mimetype },
        })

        file.pipe(writeStream)

        writeStream.on('finish', () => {
          fileUpload.getSignedUrl({ action: 'read', expires: '03-01-2030' }).then((urls) => {
            recipeData.img = urls[0]
          })
        })
      }
    })

    busboy.on('finish', async () => {
      try {
        const recipeRef = await db.collection('recipes').add(recipeData)
        res.status(201).json({ status: 'success', data: recipeRef.id })
      } catch (error) {
        console.error('Erro ao salvar receita:', error)
        res.status(500).json({ status: 'error', message: error.message })
      }
    })

    req.pipe(busboy)
  })
})

module.exports = { CreateRecipe }
