const express = require("express");
const router = express();
const axios = require("axios");
const bodyParser = require("body-parser");

dairyIngredients = [
  "Cream",
  "Cheese",
  "Milk",
  "Butter",
  "Creme",
  "Ricotta",
  "Mozzarella",
  "Custard",
  "Cream Cheese",
];
glutenIngredients = ["Flour", "Bread", "spaghetti", "Biscuits", "Beer"];
let bothRecipes = [].concat(glutenIngredients, dairyIngredients);
checkCommonsItems = function (arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] == arr2[j]) {
        return true;
      }
    }
  }
  return false;
};

router.get("/recipes/:ingredientName", (req, res) => {
  console.log("hhhhh");
  let kindGluten = req.query.gluten;
  console.log(kindGluten);
  console.log(req.query);
  let kindIndairy = req.query.dairy;
  axios
    .get(
      `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${req.params.ingredientName}`
    )
    .then((recipe) => {
      console.log("111111111");
      let Recipes = initDataRecipes(recipe);
      let RecipesWithoutGluten = [];
      let RecipesWithoutDairy = [];
      let bothGletenDairyR = [];
      for (let recipeData of Recipes) {
        if (!checkCommonsItems(recipeData.ingredients, glutenIngredients)) {
          RecipesWithoutGluten.push(recipeData);
        }
        if (!checkCommonsItems(recipeData.ingredients, dairyIngredients)) {
          RecipesWithoutDairy.push(recipeData);
        }
        if (!checkCommonsItems(recipeData.ingredients, bothRecipes)) {
          bothGletenDairyR.push(recipeData);
        }
      }
      if (kindGluten == "true" && kindIndairy == "false") {
        res.send(RecipesWithoutGluten);
      } else if (kindIndairy == "true" && kindGluten == "false") {
        res.send(RecipesWithoutDairy);
      } else if (kindGluten == "true" && kindIndairy == "true") {
        res.send(bothGletenDairyR);
      } else {
        res.send(recipe.data.results);
      }
    });
});

initDataRecipes = function (recipe) {
  let filterDataRecipes = [];
  let newRecipe = {};
  for (let i = 0; i < recipe.data.results.length; i++) {
    newRecipe = {};
    newRecipe["idMeal"] = recipe.data.results[i].idMeal;
    newRecipe["ingredients"] = recipe.data.results[i].ingredients;
    newRecipe["title"] = recipe.data.results[i].title;
    newRecipe["thumbnail"] = recipe.data.results[i].thumbnail;
    newRecipe["href"] = recipe.data.results[i].href;
    filterDataRecipes.push(newRecipe);
  }
  return filterDataRecipes;
};

module.exports = router;
