const admin = require('firebase-admin')
admin.initializeApp()

/* Recipes */
exports.createRecipe = require('./api/recipes/createRecipe').CreateRecipe
exports.deleteRecipe = require('./api/recipes/deleteRecipe').DeleteRecipe
exports.editRecipe = require('./api/recipes/editRecipe').EditRecipe
exports.getAllRecipes = require('./api/recipes/getAllRecipes').GetAllRecipes
exports.getRecipeDetails = require('./api/recipes/getRecipeDetails').GetRecipeDetails

/* Users */
exports.getUserRecipes = require('./api/users/getUserRecipes').GetUserRecipes
exports.createUser = require('./api/users/createUser').CreateUser
exports.getUsers = require('./api/users/getUser').GetAllUsers
exports.user = require('./api/users/getUser').GetUserByEmail
exports.googleUser = require('./api/users/getUser').GetUserByGoogle

/* Ingredients */
exports.ingredients = require('./api/ingredients/getAllIngredients').GetAllIngredients
