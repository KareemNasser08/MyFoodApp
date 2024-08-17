import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AddNewRecipeComponent } from './Components/add-new-recipe/add-new-recipe.component';

const routes: Routes = [
  { path: '', component: RecipesComponent},
  { path: 'add-new-recipe', component: AddNewRecipeComponent },
  { path: 'edit/:id', component: AddNewRecipeComponent }

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
