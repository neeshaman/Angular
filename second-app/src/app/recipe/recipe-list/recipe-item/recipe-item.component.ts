import { Component, Input, OnInit, Output } from '@angular/core';
import { Recipes } from 'app/recipe/recipe.model';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipes:Recipes;
  @Output() recipeSelected = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit() {
  }
  onSelected(){
    this.recipeSelected.emit();
  }

}
