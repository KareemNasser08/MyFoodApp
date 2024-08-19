import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent {
  isHide:boolean = true;
  successMsg:string = '';
  
  resetPasswordForm = new FormGroup({
    email: new FormControl (localStorage.getItem('emailForget'), [Validators.required ,Validators.email]),
    seed: new FormControl (null, [Validators.required]),
    password: new FormControl (null, [Validators.required]),
    confirmPassword: new FormControl (null, [Validators.required]),
  });


  constructor(
    private _AuthService:AuthService,
    private toastr: ToastrService,
    private _Router:Router
  ){}

  onResetPassword(data: FormGroup){
    this._AuthService.onRestPassword(data.value).subscribe({
      next:(res)=>{
        console.log(res);
        // this.successMsg = res.message;
      },
      error:(err)=>{
        console.log(err);
        this.toastr.error(err.error.message, 'Password Reset Error');
      },
      complete:()=>{
        console.log('Completed Req!');
        this.toastr.success(this.successMsg,'Success!');
        this._Router.navigate(['/auth/login']);
      },
    })
  }
}
