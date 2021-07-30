import { EventEmitter } from "@angular/core";
import { Recipes } from "./recipe.model";

export class RecipeService{
    recipeSelected = new EventEmitter<Recipes>();

    recipes: Recipes[] = [
        new Recipes('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
        new Recipes('A new Recipe', 'This is simply a new recipe', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
      ];

    //way to get recipe
      getRecipes(){
          return this.recipes.slice();//return a new array which is exact copy of this array
      }
}