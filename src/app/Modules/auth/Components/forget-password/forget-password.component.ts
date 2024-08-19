import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { iForgetPassword } from '../../Interfaces/auth';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {


  successMsg:string = '';

  forgetPasswordForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })

  constructor(
    private _AuthService:AuthService,
    private toastr: ToastrService,
    private _Router:Router
  ){}

  onForgetPassword(data: FormGroup) { 
    this._AuthService.onForgetPassword(data.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.successMsg = res.message;
        localStorage.setItem('emailForget', data.value.email);
      },
      error:(err)=>{
        console.log(err);
        this.toastr.error(err.error.message, 'Password Reset Error');
      },
      complete:()=>{
        console.log('Completed Req!');
        this.toastr.success(this.successMsg,'Success!');
        this._Router.navigate(['/auth/reset-password']);
      },
    })
  }
}
