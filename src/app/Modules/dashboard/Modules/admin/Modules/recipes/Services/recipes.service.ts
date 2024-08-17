import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private _HttpClient: HttpClient) { }

  onGetAllRecipes(myParams: any): Observable<any> {
    return this._HttpClient.get('Recipe', { params: myParams })
  }

  onGetRecipeById(id: number): Observable<any> {
    return this._HttpClient.get(`Recipe/${id}`);
  }

  onGetAllTags(): Observable<any>{
    return this._HttpClient.get('tag');
  }

  onCreateRecipe(data:any): Observable<any>{
    return this._HttpClient.post('Recipe', data);
  }
  
  onDeleteRecipe(id: number): Observable<any>{
    return this._HttpClient.delete(`Recipe/${id}`);
  }

  onUpdateRecipe(id:number, data:FormData):Observable<any>{
    return this._HttpClient.put(`Recipe/${id}`, data);
  }



}
