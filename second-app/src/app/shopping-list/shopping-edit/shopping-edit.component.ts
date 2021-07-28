import { ElementRef, EventEmitter, Output } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'app/shared/ingredient.modle';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef:ElementRef;
  @ViewChild('amountInput') amountInputRef:ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @Output() ingredientDeleted = new EventEmitter<Ingredient>();
  constructor() { }

  ngOnInit() {
  }

  onAddItem(){
    const inName = this.nameInputRef.nativeElement.value;
    const amtName = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(inName,amtName);
    this.ingredientAdded.emit(newIngredient);
  }
  onDeleteItem(){
    const inName = this.nameInputRef.nativeElement.value;
    const amtName = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(inName,amtName);
    this.ingredientDeleted.emit(newIngredient);
  }
}
