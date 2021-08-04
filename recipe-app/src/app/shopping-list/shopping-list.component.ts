import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit {

  ingrediants!:Ingredient[];
  
  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
   this.ingrediants = this.slService.getIngredients();
   this.slService.ingredientsChanged.subscribe(
    (ingredient:Ingredient[]) => {
      this.ingrediants =ingredient;
    }
   );
  }
}
