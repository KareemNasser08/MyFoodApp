import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../../categories/Services/categories.service';
import { RecipesService } from '../../Services/recipes.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-add-new-recipe',
  templateUrl: './add-new-recipe.component.html',
  styleUrls: ['./add-new-recipe.component.scss']
})
export class AddNewRecipeComponent implements OnInit {
  listTags: any[] = [];
  listCategories: any[] = [];
  tagId: number = 0;
  categoryId: number = 0;
  itemId: number = 0;
  title: string = 'Add New';
  recipeData: any;

  constructor(
    private _CategoriesService: CategoriesService,
    private _RecipesService: RecipesService,
    private toastr: ToastrService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onGetAllCategories();
    this.onGetTags();
    this.itemId = this._ActivatedRoute.snapshot.params['id'];
    if (this.itemId) {
      this.title = 'Edit';
      this.onGetRecipeById(this.itemId);
    }
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

  files: File[] = [];
  imgSrc: any = '';

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    // this.imgSrc = this.files[0];
    this.recipeForm.controls.recipeImage.setValue(this.files[0]);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  recipeForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    tagId: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    categoriesIds: new FormControl(null),
    recipeImage: new FormControl(this.imgSrc),
  });

  onCreateRecipe(data: FormGroup) {
    console.log(data.value);

    let myRecipeFormData = new FormData();
    for (let controlName in data.controls) {
      if (data.controls.hasOwnProperty(controlName)) {
        const controlValue = data.controls[controlName].value;
        myRecipeFormData.append(controlName, controlValue);
      }
    }

    if(this.itemId){

      this._RecipesService.onUpdateRecipe(this.itemId, myRecipeFormData).subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success(res.message, 'Success!');
        },
        error: (err) => {
          console.log(err)
        },
        complete: () => {
          console.log('Completed Req!');
          this._Router.navigate(['/dashboard/admin/recipes'])
        }
      })
    } else {
      this._RecipesService.onCreateRecipe(myRecipeFormData).subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success(res.message, 'Success!');
        },
        error: (err) => {
          console.log(err)
        },
        complete: () => {
          console.log('Completed Req!');
          this._Router.navigate(['/dashboard/admin/recipes'])
        }
      })
    }

  
  }

  onGetRecipeById(id: number) {
    this._RecipesService.onGetRecipeById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.recipeData = res;
        // this.toastr.success('Recipe Details Updated Successfully', 'Success!')
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Completed Req!');
        this.recipeForm.patchValue({
          name: this.recipeData.name,
          price: this.recipeData.price,
          tagId: this.recipeData.tag.id,
          description: this.recipeData.description,
          categoriesIds: this.recipeData.category.map((c: any) => { c.id }),
          // recipeImage: this.recipeData.recipeImage,
        })
      },
    })
  }

  onSendData(){
    if(this.itemId){}
  }
}
