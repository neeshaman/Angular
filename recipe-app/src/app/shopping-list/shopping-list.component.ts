import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit,OnDestroy {

  ingrediants!:Ingredient[];
  private subscription!:Subscription;
  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
   this.ingrediants = this.slService.getIngredients();
   this.subscription=this.slService.ingredientsChanged.subscribe(
    (ingredient:Ingredient[]) => {
      this.ingrediants =ingredient;
    }
   );
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onEditItem(index:number){
    this.slService.startedEditing.next(index);
  }
}
