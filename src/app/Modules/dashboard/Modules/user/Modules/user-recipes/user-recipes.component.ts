import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../../admin/Modules/categories/Services/categories.service';
import { RecipesService } from '../../../admin/Modules/recipes/Services/recipes.service';
import { ViewRecipeComponent } from './Components/view-recipe/view-recipe.component';
import { FavserviceService } from '../../Services/favservice.service';



@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.scss']
})
export class UserRecipesComponent {
  searchKey: string = '';
  name: string = '';

  listData: any;
  listTags: any[] = [];
  listCategories: any[] = [];
  tagId: number = 0;
  categoryId: number = 0;


  constructor(
    private _CategoriesService: CategoriesService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private _RecipesService: RecipesService,
    private _FavserviceService:FavserviceService
  ) { }

  ngOnInit(): void {
    this.onGetRecipes();
    this.onGetTags();
    this.onGetAllCategories();
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
    this.onGetRecipes();
  }

  clearFilter() {
    this.searchKey = '';
    this.tagId = 0;
    this.categoryId = 0;
    this.onGetRecipes();
  }

  onGetTags() {
    this._RecipesService.onGetAllTags().subscribe({
      next: (res) => {
        console.log(res);
        this.listTags = res;
        // this.length = res.totalNumberOfRecords;
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
        // this.length = res.totalNumberOfRecords;
      },
      error: (err) => {
        console.log(err);

      },
      complete: () => {
        console.log('Completed Req!');

      }
    })
  }

  onGetRecipes() {
    let dataParams = { pageSize: this.pageSize, pageNumber: this.pageIndex, name: this.searchKey, categoryId: this.categoryId, tagId: this.tagId }

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

  openViewRecipe(data:any){
    console.log(data);
    const dialogRef = this.dialog.open(ViewRecipeComponent, {
      data: data,

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        // this.onAddCategory(result)
        this.onAddToFav(result);
      }
    });

  }


  onAddToFav(id: number){
    this._FavserviceService.addToFav(id).subscribe(
      {
        next:(res)=>{
          console.log(res);
          this.toastr.success('Recipe added to Fav successfully', 'Success')
        },
        error: (err)=>{
          console.log(err);
        },
        complete:()=>{
          console.log('Completed Req!');      
        },
      }
    )
  }

}
