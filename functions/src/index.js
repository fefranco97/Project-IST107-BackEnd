const { CreateRecipe } = require('./api/createRecipe')
const { DeleteRecipe } = require('./api/deleteRecipe')
const { EditRecipe } = require('./api/editRecipe')
const { GetAllRecipes } = require('./api/getAllRecipes')
const { GetRecipeDetails } = require('./api/getRecipeDetails')
const { UpdateRecipe } = require('./api/updateRecipe')
const { GetUserRecipes } = require('./api/getUserRecipes')

exports.createRecipe = CreateRecipe
exports.deleteRecipe = DeleteRecipe
exports.editRecipe = EditRecipe
exports.getAllRecipes = GetAllRecipes
exports.getRecipeDetails = GetRecipeDetails
exports.updateRecipe = UpdateRecipe
exports.getUserRecipes = GetUserRecipes
