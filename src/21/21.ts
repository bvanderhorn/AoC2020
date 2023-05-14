import * as h from '../helpers';
type Line = {
    Ingredients: string[],
    Allergens: string[]
}
var ingredients:Line[] = h.read(21, "ingredients.txt").match(/([^(]+)\s+\(contains\s+([^)]+)\)/, true)
    .map((l:string[]) => { return {Ingredients:l[0].split(' '), Allergens: l[1].split(', ')}});
h.print(ingredients.slice(0,3));
