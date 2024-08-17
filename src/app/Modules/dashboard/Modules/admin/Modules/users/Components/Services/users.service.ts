import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _HttpClient: HttpClient) { }

  getAllUsers(data: any): Observable<any> {
    return this._HttpClient.get('Users', data);
  }

  getUserById(id: number): Observable<any> {
    return this._HttpClient.get(`Users/${id}`);
  }

  updateMyProfile(data: FormData): Observable<any> {
    return this._HttpClient.put('Users', data);
  }

  deleteUserById(id: number): Observable<any> {
    return this._HttpClient.delete(`Users/${id}`);
  }
}
