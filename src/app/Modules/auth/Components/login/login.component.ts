import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isHide: boolean = true;
  
  loginForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    }
  );

  onLogin(data: FormGroup) {
    this._AuthService.onLogin(data.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('userToken', res.token);
        this._AuthService.getProfile();
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error.message, 'Login Failed');
      },
      complete: () => {
        console.log('Completed Request!');
        this.toastr.success('You have successfully logged in', 'Login Successful');
        this._Router.navigate(['/dashboard']);
      },
    })
  }

  constructor(
    private _AuthService: AuthService,
    private toastr: ToastrService,
    private _Router:Router
  ) { }
}
