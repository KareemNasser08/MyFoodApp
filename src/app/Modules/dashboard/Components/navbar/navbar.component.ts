import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  userName = localStorage.getItem('userName');
  userRole = localStorage.getItem('role');

  constructor(
    private dialog: MatDialog,
    private _Router:Router
  ){}


  openDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }


  logOut(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('role');
    localStorage.clear;
    this._Router.navigate(['/auth']); 
  }
}
