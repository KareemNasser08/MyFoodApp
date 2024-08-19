import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  declarations: [
    SharedComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    MatDialogModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule
  ],
  exports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    MatDialogModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule
  ]
})
export class SharedModule { }
