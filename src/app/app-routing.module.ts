import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardGuard } from './Core/Guards/dashboard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./Modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', canActivate: [dashboardGuard], loadChildren: () => import('./Modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
