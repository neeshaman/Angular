import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipes } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected =new EventEmitter<Recipes>();

 @Output() recipes: Recipes[] = [
    new Recipes('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
    new Recipes('A new Recipe', 'This is simply a new recipe', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
  ];

  constructor() { }

  ngOnInit() {
  }
  onRecipeSelected(recipe:Recipes){
    this.recipeWasSelected.emit(recipe);
  }

}
