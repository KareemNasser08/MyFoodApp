import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient: HttpClient) { }

  onGetAllCategories(myParams: any): Observable<any> {
    return this._HttpClient.get('Category', { params: myParams })
  }

  onAddCategory(data: string): Observable<any> {
    return this._HttpClient.post('Category', { name: data })
  }
  
  onDeleteCateogry(data: number): Observable<any> {
    return this._HttpClient.delete(`Category/${data}`);
  }
  
  // onUpdateCateogry(data: string): Observable<any> {
  //   return this._HttpClient.put(`Category/${data}`);
  // }
  onUpdateCategory(data:string):Observable<any>{
    return this._HttpClient.put(`Category/${data}`,'')
  }

}
