import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './Services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { ToastrService } from 'ngx-toastr';
import { DeleteDialogComponent } from 'src/app/Modules/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  searchKey: string = '';
  name: string = '';

  listData: any;
  constructor(
    private _CategoriesService: CategoriesService,
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) { }
  ngOnInit(): void {
    this.onGetCategories();
  }

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50, 75];

  showPageSizeOptions = true;
  pageEvent: any;

  handlePageEvent(e: any) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.onGetCategories();
  }

  clearFilter() {
    this.searchKey = '';
    this.onGetCategories();
  }

  onGetCategories() {
    this._CategoriesService.
      onGetAllCategories({ pageSize: this.pageSize, pageNumber: this.pageIndex + 1, name: this.searchKey })
      .subscribe(
        {
          next: (res) => {
            console.log(res);
            this.listData = res;
            this.length = res.totalNumberOfRecords;
          },
          error: (err) => {
            console.log(err);

          },
          complete: () => {
            console.log('Completed Req!');

          }
        }
      )
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: { name: this.name },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.onAddCategory(result);
      }
    });
  }

  openDeleteDialog(myId: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { text: 'Category', id: myId },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        // this.onAddCategory(result);
        this.onDeleteCategory(result);
      }
    });
  }

  onAddCategory(val: string) {
    // let obj = {
    //   name: val
    // };

    this._CategoriesService.onAddCategory(val).subscribe({
      next: (res) => {
        console.log(res);

      },
      error: (err) => {
        console.log(err);

      },
      complete: () => {
        console.log('Completed Req!');
        this.toastr.success('Category Added Successfuly.', 'Success!');
        this.onGetCategories();
      },
    })
  }


  onDeleteCategory(id: number) {
    this._CategoriesService.onDeleteCateogry(id).subscribe({
      next: (res) => {
        console.log(res);

      },
      error: (err) => {
        console.log(err);

      },
      complete: () => {
        console.log('Completed Req!');
        this.toastr.success('Category Deleted Successfuly.', 'Success!');
        this.onGetCategories();
      },
    })
  }

}