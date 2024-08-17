import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    AddEditCategoryComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule { }
