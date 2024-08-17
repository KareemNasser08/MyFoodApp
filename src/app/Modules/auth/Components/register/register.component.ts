import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { VerifyAccountComponent } from '../verify-account/verify-account.component';
// import { iRegisterUser } from '../../Interfaces/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  isHide: boolean = true;

  successMsg: string = '';

  constructor(
    private _AuthService: AuthService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(VerifyAccountComponent, {
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  registerForm = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    country: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
    profileImage: new FormControl(null),
  })

  files: File[] = [];
  imgSrc: any = '';

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    this.imgSrc = this.files[0];
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onRegisterUser(data: FormGroup) {
    let registerFormData = new FormData();
    registerFormData.append('userName', data.value.userName);
    registerFormData.append('email', data.value.email);
    registerFormData.append('country', data.value.country);
    registerFormData.append('phoneNumber', data.value.phoneNumber);
    registerFormData.append('password', data.value.password);
    registerFormData.append('confirmPassword', data.value.confirmPassword);
    registerFormData.append('profileImage', this.imgSrc);

    this._AuthService.onRegisterUser(registerFormData).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success(res.message, 'Success!');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error.message, 'Register Error');
      },
      complete: () => {
        console.log('Completed Req!');
        localStorage.setItem('registerEmail', data.value.email);
        this.openDialog();
        // this._Router.navigate(['/auth/login']);
      },
    })
  }

}
