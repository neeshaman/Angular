import { Component, Input, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { Recipes } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipes!:Recipes;
  @Input() index!:number;
  ngOnInit() {
  }
  // onSelected(){
  //   this.recipeService.recipeSelected.emit(this.recipes);
  // }

}
