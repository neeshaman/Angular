import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService{

    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
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
    getIngredient(index:number){
        return this.ingrediants[index];
    }
    addIngredients(ingredients:Ingredient[]){
        // for(let ingredient of ingredients){
        //     this.addIngredient(ingredient);
        // }
        this.ingrediants.push(...ingredients);
        this.ingredientsChanged.next(this.ingrediants.slice());
    }
    updateIngredient(index:number, newIngredient:Ingredient){
        this.ingrediants[index]=newIngredient;
        this.ingredientsChanged.next(this.ingrediants.slice());
    }
    deleteIngredient(index:number){
        this.ingrediants.splice(index,1);//splice one
        this.ingredientsChanged.next(this.ingrediants.slice());
    }
}