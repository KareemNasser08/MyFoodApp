import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeleteDialogComponent } from 'src/app/Modules/shared/delete-dialog/delete-dialog.component';
import { AddEditCategoryComponent } from '../categories/components/add-edit-category/add-edit-category.component';
import { CategoriesService } from '../categories/Services/categories.service';
import { RecipesService } from './Services/recipes.service';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent {
  searchKey: string = '';
  name: string = '';

  listData: any;
  listTags: any[] = [];
  listCategories: any[] = [];
  tagId: number = 0;
  categoryId: number = 0;

  length = 50;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25, 50, 75];

  showPageSizeOptions = true;
  pageEvent: any;

  constructor(
    private _CategoriesService: CategoriesService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private _RecipesService: RecipesService
  ) { }

  ngOnInit(): void {
    this.onGetRecipes();
    this.onGetTags();
    this.onGetAllCategories();
  }

  onGetTags() {
    this._RecipesService.onGetAllTags().subscribe({
      next: (res) => {
        console.log(res);
        this.listTags = res;
      },
      error: (err) => {
        console.log(err);

      },
      complete: () => {
        console.log('Completed Req!');

      }
    })
  }

  onGetAllCategories() {
    this._CategoriesService.onGetAllCategories({ pageSize: 1000, pageNumber: 1 }).subscribe({
      next: (res) => {
        console.log(res);
        this.listCategories = res.data;
      },
      error: (err) => {
        console.log(err);

      },
      complete: () => {
        console.log('Completed Req!');

      }
    })
  }

  clearFilter() {
    this.searchKey = '';
    this.tagId = 0;
    this.categoryId = 0;
    this.onGetRecipes();
  }


  onGetRecipes() {
    let dataParams = 
    { 
      pageSize: this.pageSize, 
      pageNumber: this.pageIndex + 1,
      name: this.searchKey, 
      categoryId: this.categoryId, 
      tagId: this.tagId 
    }

    this._RecipesService.
      onGetAllRecipes(dataParams)
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

    
  handlePageEvent(e: any) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.onGetRecipes();
  }

  onDeleteRecipe(id: number) {
    this._RecipesService.onDeleteRecipe(id).subscribe({
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

  openDeleteDialog(myId: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { text: 'Category', id: myId },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        // this.onAddCategory(result);
        this.onDeleteRecipe(result);
        this.onGetRecipes();
      }
    });
  }



  // onAddCategory(val: string) {
  //   // let obj = {
  //   //   name: val
  //   // };

  //   this._CategoriesService.onAddCategory(val).subscribe({
  //     next: (res) => {
  //       console.log(res);

  //     },
  //     error: (err) => {
  //       console.log(err);

  //     },
  //     complete: () => {
  //       console.log('Completed Req!');
  //       this.toastr.success('Category Added Successfuly.', 'Success!')
  //     },
  //   })
  // }
}
