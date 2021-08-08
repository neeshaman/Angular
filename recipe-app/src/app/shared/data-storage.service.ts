import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipes } from "../recipe/recipe.model";
import { RecipeService } from "../recipe/recipe.service";
import  {exhaustMap, map,take,tap} from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService{
    constructor(private http:HttpClient,private recipeService:RecipeService ,private authService:AuthService){}


    storeRecipe(){
        const recipes= this.recipeService.getRecipes();
        // stores all recipes override all the data sotred under that node
        this.http.put('https://ng-course-recipe-book-db76a-default-rtdb.firebaseio.com/recipes.json',recipes)
        .subscribe(response=>{
            console.log(response);
        });
    }

    fetchRecipe(){
        
                return this.http
                .get<Recipes[]>('https://ng-course-recipe-book-db76a-default-rtdb.firebaseio.com/recipes.json')
                .pipe(
                    map(recipes=>{ //map here is rxjs observer
                        return recipes.map(recipe=>{
                            return {
                                ...recipe,
                                ingredients:recipe.ingredients ? recipe.ingredients : []
                            };
                        }); //here map is an array
                    }),
                    tap(recipes =>{
                        this.recipeService.setRecipes(recipes);
                    })
                ); 
        //take 1 value from that observale and after that it will unsubscribe
    }
}