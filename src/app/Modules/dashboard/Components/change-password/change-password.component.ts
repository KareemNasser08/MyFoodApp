import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Modules/auth/Services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  isHide:boolean = true;
  successMsg:string = '';
  
  changePasswordForm = new FormGroup({
    oldPassword: new FormControl (null, [Validators.required]),
    newPassword: new FormControl (null, [Validators.required]),
    confirmNewPassword: new FormControl (null, [Validators.required]),
  });


  constructor(
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private _AuthService: AuthService,
    private toastr: ToastrService,
    private _Router:Router
  ){}

  onChangePassword(data: FormGroup){
    this._AuthService.onChangePassword(data.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.successMsg = res.message;
      },
      error:(err)=>{
        console.log(err);
        this.toastr.error(err.error.message, 'Change Password Error');
      },
      complete:()=>{
        console.log('Completed Req!');
        this.toastr.success(this.successMsg,'Success!');
        this._Router.navigate(['/auth/login']);
      },
    })
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
