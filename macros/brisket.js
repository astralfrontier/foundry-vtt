import { recipes, ingredients, canMakeRecipe } from "../src/gourmet";

function ingredientsFor(recipe) {
    return Object.keys(recipe.ingredients).map(i => `${i}: ${recipe.ingredients[i]}`).join(', ');
}

const ingredientList = ingredients(actor);
const recipeList = recipes(actor);
const viableRecipeList = recipeList.filter(recipe => canMakeRecipe(recipe, ingredientList));

const viableRecipeHtml = viableRecipeList.map(recipe => `<h3>${ingredientsFor(recipe)}</h3>${recipe.effect}`).join('\n');

const fd = await foundry.applications.api.DialogV2.input({
  window: { title: "Brisket", resizable: true },
  position: {
    width: 860,
    height: 640
  },
  content: viableRecipeHtml,
  ok: {
    label: "Close"
  }
});