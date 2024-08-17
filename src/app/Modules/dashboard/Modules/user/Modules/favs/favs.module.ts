import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavsRoutingModule } from './favs-routing.module';
import { FavsComponent } from './favs.component';
import { SharedModule } from 'src/app/Modules/shared/shared.module';


@NgModule({
  declarations: [
    FavsComponent
  ],
  imports: [
    CommonModule,
    FavsRoutingModule,
    SharedModule
  ]
})
export class FavsModule { }
