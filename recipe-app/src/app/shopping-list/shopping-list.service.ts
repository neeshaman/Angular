import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService{

    ingredientsChanged = new Subject<Ingredient[]>();
    
        private  ingrediants:Ingredient[] = [
            new Ingredient('Apple',5),
            new Ingredient('orange',10)
        ];
    getIngredients(){
        return this.ingrediants.slice();
    }

    addIngredient(ingredient:Ingredient){
        this.ingrediants.push(ingredient);
        this.ingredientsChanged.next(this.ingrediants.slice());

    }

    addIngredients(ingredients:Ingredient[]){
        // for(let ingredient of ingredients){
        //     this.addIngredient(ingredient);
        // }
        this.ingrediants.push(...ingredients);
        this.ingredientsChanged.next(this.ingrediants.slice());
    }
}