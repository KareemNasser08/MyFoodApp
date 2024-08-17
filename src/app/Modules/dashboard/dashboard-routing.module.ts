import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { userGuard } from 'src/app/Core/Guards/user.guard';
import { adminGuard } from 'src/app/Core/Guards/admin.guard';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'user', canActivate: [userGuard], loadChildren: () => import('./Modules/user/user.module').then(m => m.UserModule) },
      { path: 'admin', canActivate: [adminGuard], loadChildren: () => import('./Modules/admin/admin.module').then(m => m.AdminModule) }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
