import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userName = localStorage.getItem('userName');
  userRole = localStorage.getItem('role');
  userEmail = localStorage.getItem('userEmail');
}
