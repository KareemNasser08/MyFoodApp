import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iForgetPassword, iLogin, iRegisterUser, iRestPassword, iVerifyAccount } from '../Interfaces/auth';
import { jwtDecode } from "jwt-decode";
import { FormGroup } from '@angular/forms';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getProfile() {
    const encodedToken: any = localStorage.getItem('userToken');
    const decodedToken: any = jwtDecode(encodedToken);
    console.log(decodedToken);
    localStorage.setItem('userName', decodedToken.userName);    
    localStorage.setItem('userEmail', decodedToken.userEmail);
    localStorage.setItem('role', decodedToken.userGroup);
  }
  
  role: string | null = '';
  getRole() {
    if (localStorage.getItem('userToken') !== null && localStorage.getItem('role') !== null) {
      this.role = localStorage.getItem('role');
    }
    return this.role;
  }

  constructor(private _HttpClient: HttpClient) { 
    // this.getProfile();
    this.getRole();
  }

  onLogin(data: iLogin): Observable<any> {
    return this._HttpClient.post('Users/Login', data)
  }

  onForgetPassword(data: iForgetPassword): Observable<any> {
    return this._HttpClient.post('Users/Reset/Request', data)
  }

  onRegisterUser( data: FormData): Observable<any>{
    return this._HttpClient.post('Users/Register', data)
  }

  onRestPassword( data: iRestPassword): Observable<any>{
    return this._HttpClient.post('Users/Reset', data)
  }

  onVerifyAccount (data: iVerifyAccount): Observable<any>{
    return this._HttpClient.post('Users/Verify', data);
  }

  onChangePassword (data: FormGroup): Observable<any>{
    return this._HttpClient.put('Users/ChangePassword', data);
  }
}
