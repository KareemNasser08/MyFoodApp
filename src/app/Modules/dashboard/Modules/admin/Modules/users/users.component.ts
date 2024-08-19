import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeleteDialogComponent } from 'src/app/Modules/shared/delete-dialog/delete-dialog.component';
import { CategoriesService } from '../categories/Services/categories.service';
import { RecipesService } from '../recipes/Services/recipes.service';
import { UsersService } from './Components/Services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  listData: any;

  // length = 50;
  // pageSize = 10;
  // pageIndex = 0;
  // pageSizeOptions = [5, 10, 25, 50, 75];

  searchKey: string = '';
  filterOption: string = '';
  group: number | string = '';

  constructor(
    private _CategoriesService: CategoriesService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private _UsersService: UsersService
  ) { }
  ngOnInit(): void {
    this.onGetAllUsers();
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
    this.onGetAllUsers();
  }
  clearFilter() {
    this.searchKey = '';
    // this.tagId = 0;
    // this.categoryId = 0;
    this.onGetAllUsers();
  }

  onGetAllUsers() {
    let dataQuery = {
      pageSize: this.pageSize,
      pageNumber: this.pageIndex,
      userName: this.searchKey,
    }

    this._UsersService.getAllUsers(dataQuery).subscribe({
      next: (res) => {
        console.log(res);
        this.listData = res;
        this.length = res.totalNumberOfRecords;

      },
      error: (err) => {
        console.log(err);
      }, complete: () => {
        console.log('Completed Req!')
      }
    })
  }

  openDeleteDialog(myId: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { text: 'Category', id: myId },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        // this.onAddCategory(result);
        this.onDeleteUser(result);
        this.onGetAllUsers();
      }
    });
  }

  onDeleteUser(id: number) {
    this._UsersService.deleteUserById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Recipe Deleted Successfuly.', 'Success!')
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Completed Req!');
      },
    })
  }



}
