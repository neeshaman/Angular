import { Component, Input, OnInit, Output } from '@angular/core';
import { Recipes } from 'app/recipe/recipe.model';
import { EventEmitter } from '@angular/core';
import { RecipeService } from 'app/recipe/recipe.service';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipes:Recipes;
  
  constructor(private recipeService:RecipeService) { }

  ngOnInit() {
  }
  onSelected(){
    this.recipeService.recipeSelected.emit(this.recipes);
  }

}
