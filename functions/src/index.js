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
exports.user = require('./api/users/getUser').GetUserByEmail
exports.google = require('./api/users/login').LoginWithGoogle

/* Ingredients */
exports.ingredients = require('./api/ingredients/getAllIngredients').GetAllIngredients
