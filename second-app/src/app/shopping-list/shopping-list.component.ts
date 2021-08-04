import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'app/shared/ingredient.module';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingrediants:Ingredient[] = [
    new Ingredient('Apple',5),
    new Ingredient('orange',10)
  ];
  constructor() { }

  ngOnInit() {
  }
  onIngredientAdded(ingrediant:Ingredient){
    this.ingrediants.push(ingrediant);
  }
}
