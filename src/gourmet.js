function cookbookCombinationToTasteObject(combo) {
    const tastes = {};
    tastes[combo.taste1] = (tastes[combo.taste1] || 0) + 1;
    tastes[combo.taste2] = (tastes[combo.taste2] || 0) + 1;
    return tastes;
}

// Returns an array of objects containing effect, taste1, and taste2 keys
export function recipes(actor) {
    const cookbookItem = actor.items.find(item => (item.name === 'Cookbook' && item.type === 'classFeature'));
    if (cookbookItem) {
        const combinations = Object.values(cookbookItem.system.data.combinations).filter(combo => combo.effect !== '');
        return combinations.map(combo => ({
            effect: combo.effect,
            ingredients: cookbookCombinationToTasteObject(combo)
        }));
    } else {
        return [];
    }
}

export function ingredients(actor) {
    const ingredientList = actor.items.filter(item => item.type === 'classFeature' && item.system?.data?.type === 'projectfu.ingredient');
    return ingredientList.reduce(
        (il, ingredient) => {
            il[ingredient.system.data.taste] = ingredient.system.data.quantity;
            return il;
        },
        {}
    )
}

// For each ingredient in the recipe's ingredients list, does ingredients have that many objects?
export function canMakeRecipe(recipe, ingredients) {
    return Object.keys(recipe.ingredients).every(ingredient => ingredients[ingredient] >= recipe.ingredients[ingredient]);
}