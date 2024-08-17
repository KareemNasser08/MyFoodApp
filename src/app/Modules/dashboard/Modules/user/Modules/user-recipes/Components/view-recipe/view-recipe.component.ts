import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/Modules/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewRecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
