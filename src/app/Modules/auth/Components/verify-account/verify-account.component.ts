import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../Services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent {

  verifyForm = new FormGroup({
    email: new FormControl(localStorage.getItem('registerEmail'), [Validators.required, Validators.email]),
    code: new FormControl(null, [Validators.required])
  });
  
  
  constructor(
    public dialogRef: MatDialogRef<VerifyAccountComponent>,
    private _AuthService: AuthService,
    private toastr: ToastrService,
    private _Router:Router

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onverifyForm(data: FormGroup) { 
    this._AuthService.onVerifyAccount(data.value).subscribe({
      next: (res)=>{
        console.log(res);
        this.toastr.success(res.message, 'Success!');

      },
      error: (err)=>{
        console.log(err);
        this.toastr.error(err.error.message, 'Register Error');

      },
      complete: ()=>{
        console.log('Completed Req!');
        this._Router.navigate(['/auth/login'])
      },
    })
  }
}
