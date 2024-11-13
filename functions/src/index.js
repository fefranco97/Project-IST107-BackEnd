const admin = require('firebase-admin')
admin.initializeApp()

const { CreateRecipe } = require('./api/createRecipe')
const { DeleteRecipe } = require('./api/deleteRecipe')
const { EditRecipe } = require('./api/editRecipe')
const { GetAllRecipes } = require('./api/getAllRecipes')
const { GetRecipeDetails } = require('./api/getRecipeDetails')
const { UpdateRecipe } = require('./api/updateRecipe')
const { GetUserRecipes } = require('./api/getUserRecipes')
const { CreateUser } = require('./api/createUser')

exports.createRecipe = CreateRecipe
exports.deleteRecipe = DeleteRecipe
exports.editRecipe = EditRecipe
exports.getAllRecipes = GetAllRecipes
exports.getRecipeDetails = GetRecipeDetails
exports.updateRecipe = UpdateRecipe
exports.getUserRecipes = GetUserRecipes
exports.createUser = CreateUser
