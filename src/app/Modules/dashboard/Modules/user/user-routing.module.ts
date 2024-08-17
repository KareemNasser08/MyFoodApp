import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      { path: 'userRecipes', loadChildren: () => import('./Modules/user-recipes/user-recipes.module').then(m => m.UserRecipesModule) },
      { path: 'favs', loadChildren: () => import('./Modules/favs/favs.module').then(m => m.FavsModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
