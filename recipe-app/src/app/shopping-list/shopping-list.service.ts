import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{

    ingredientsChanged = new EventEmitter<Ingredient[]>();
    
        private  ingrediants:Ingredient[] = [
            new Ingredient('Apple',5),
            new Ingredient('orange',10)
        ];
    getIngredients(){
        return this.ingrediants.slice();
    }

    addIngredient(ingredient:Ingredient){
        this.ingrediants.push(ingredient);
        this.ingredientsChanged.emit(this.ingrediants.slice());

    }

    addIngredients(ingredients:Ingredient[]){
        // for(let ingredient of ingredients){
        //     this.addIngredient(ingredient);
        // }
        this.ingrediants.push(...ingredients);
        this.ingredientsChanged.emit(this.ingrediants.slice());
    }
}