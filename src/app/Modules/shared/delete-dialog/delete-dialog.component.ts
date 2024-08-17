import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from '../../dashboard/Modules/admin/Modules/categories/Services/categories.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  // onDeleteItem(id: number) {
  //   this._CategoriesService.onDeleteCateogry(id).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.toastr.success('Item Deleted Successfully','Success!')

  //     },
  //     error: (err) => {
  //       console.log(err);

  //     },
  //     complete: () => {
  //       console.log('Completed Req!');

  //     },
  //   })
  // }
}
