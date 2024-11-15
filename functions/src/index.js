
const admin = require('firebase-admin')
admin.initializeApp()

/* Recipes */
const { CreateRecipe } = require('./api/recipes/createRecipe')
const { DeleteRecipe } = require('./api/recipes/deleteRecipe')
const { EditRecipe } = require('./api/recipes/editRecipe')
const { GetAllRecipes } = require('./api/recipes/getAllRecipes')
const { GetRecipeDetails } = require('./api/recipes/getRecipeDetails')

/* Users */
const { GetUserRecipes } = require('./api/users/getUserRecipes')
const { CreateUser } = require('./api/users/createUser')
const { GetUsers } = require('./api/users/getUsers')

exports.createRecipe = CreateRecipe
exports.deleteRecipe = DeleteRecipe
exports.editRecipe = EditRecipe
exports.getAllRecipes = GetAllRecipes
exports.getRecipeDetails = GetRecipeDetails
exports.getUserRecipes = GetUserRecipes
exports.createUser = CreateUser
exports.getUsers = GetUsers
