import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FavserviceService {

  constructor(private _HttpClient: HttpClient) { }

  addToFav(id:number): Observable<any> {
    return this._HttpClient.post('userRecipe', {recipeId: id});
  }

  deleteToFav(id:number): Observable<any> {
    return this._HttpClient.delete(`userRecipe/${id}`);
  }

  getFavs():Observable<any>{
    return this._HttpClient.get('userRecipe');
  }

}
