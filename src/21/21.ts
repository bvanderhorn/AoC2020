import * as h from '../helpers';
type Line = {
    Ingredients: string[],
    Allergens: string[]
}
var ingredients:Line[] = h.read(21, "ingredients.txt").match(/([^(]+)\s+\(contains\s+([^)]+)\)/, true)
    .map((l:string[]) => { return {Ingredients:l[0].split(' '), Allergens: l[1].split(', ')}});
h.print(ingredients.slice(0,3));
var allergens = new Map<string, string[]>();
for (const line of ingredients) {
    for (const allergen of line.Allergens) {
        var ing = allergens.get(allergen);
        if (ing != undefined) allergens.set(allergen, ing.intersect(line.Ingredients));
        else allergens.set(allergen, line.Ingredients);
    }
}

h.print(allergens);
var possiblyContaining = Array.from(allergens.values()).flat().unique();
h.print(possiblyContaining);
h.print("part 1:", ingredients.map(l => l.Ingredients.filter(i => !possiblyContaining.includes(i)).length).sum());

// part 2
var allergensList = Array.from(allergens, (k,_) => {return {allergen: k[0], ingredients: k[1]}});
var solvedIngredients = h.simpleSolve(allergensList.map(l => l.ingredients));
var solved = allergensList.map((a,i) => [a.allergen, solvedIngredients[i]]).sort();
h.print("part 2:",solved.map(s => s[1]).join(','));