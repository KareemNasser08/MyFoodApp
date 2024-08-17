import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: 'users', loadChildren: () => import('./Modules/users/users.module').then(m => m.UsersModule) },
      { path: 'recipes', loadChildren: () => import('./Modules/recipes/recipes.module').then(m => m.RecipesModule) },
      { path: 'categories', loadChildren: () => import('./Modules/categories/categories.module').then(m => m.CategoriesModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
