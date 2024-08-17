import { Component } from '@angular/core';
import { AuthService } from 'src/app/Modules/auth/Services/auth.service';

interface IMenu {
  text: string,
  icon: string,
  link: string,
  isActive: boolean,
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {


  constructor(private _AuthService: AuthService) { 
    // console.log(this.isAdmin());
    // console.log(this.isUser());
  }


  menuLinks: IMenu[] = [
    {
      text: 'Home',
      icon: 'fa-solid fa-house',
      link: 'home',
      isActive: true
    },
    {
      text: 'Users',
      icon: 'fa-solid fa-users',
      link: '/dashboard/admin/users',
      isActive: this.isAdmin(),
    },
    {
      text: 'Recipes',
      icon: 'fa-solid fa-carrot',
      link: '/dashboard/admin/recipes',
      isActive: this.isAdmin(),
    },
    {
      text: 'Categorties',
      icon: 'fa-solid fa-calendar-days',
      link: '/dashboard/admin/categories',
      isActive: this.isAdmin(),
    },
    {
      text: 'User Recipes',
      icon: 'fa-solid fa-carrot',
      link: '/dashboard/user/userRecipes',
      isActive: this.isUser(),
    },
    {
      text: 'Favorites',
      icon: 'fa-solid fa-star',
      link: '/dashboard/user/favs',
      isActive: this.isUser(),
    },
    
  ]

  isAdmin(): boolean {
    return this._AuthService.role === 'SuperAdmin' ? true : false;
  }

  isUser(): boolean {
    return this._AuthService.role === 'SystemUser' ? true : false;
  }

  
}
