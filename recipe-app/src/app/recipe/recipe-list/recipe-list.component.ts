import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipes } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit ,OnDestroy{

  @Output() recipeWasSelected = new EventEmitter<Recipes>();
  recipes!: Recipes[];
  constructor(private recipeService:RecipeService,private router:Router,private route:ActivatedRoute) { }

  subscription!:Subscription;
  ngOnInit(): void {
  this.subscription=  this.recipeService.recipeChanged.subscribe(
      (recipe:Recipes[]) =>{
        this.recipes = recipe;
      }
    )
    this.recipes = this.recipeService.getRecipes();
  }
  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo:this.route});
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
