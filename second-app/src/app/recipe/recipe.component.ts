import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipes } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  selectedRecipe:Recipes;
  constructor(private recipeService:RecipeService) { }

  ngOnInit() {
    this.recipeService.recipeSelected.subscribe(
      (recipe:Recipes)=>{
        this.selectedRecipe = recipe;
      }
    )
  }

}
