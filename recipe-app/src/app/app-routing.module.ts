import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.gaurd';
import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { RecipeResolverService } from './recipe/recipe-resolver.service';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  { path: '' ,redirectTo: '/recipes' , pathMatch: 'full'},
  { path: 'shopping-list' , component: ShoppingListComponent },
  { path: 'recipes' ,component: RecipeComponent,canActivate: [AuthGuard] , children:[
    {path:'', 
    component:RecipeStartComponent},
    { path : 'new' ,component:RecipeEditComponent},
    {path:':id' , component:RecipeDetailsComponent,resolve:[RecipeResolverService]},
    { path : ':id/edit' ,component:RecipeEditComponent},
   
    ]
  },
  {path: 'auth' , component:AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
