import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HeaderComponent } from './header/header.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {
    path :'list',
    component: TaskComponent,
    canActivate : [AuthGuard]
   },
  {
    path: 'header',
    component:HeaderComponent
  },
  {
    path : 'login',
    component:LoginComponent
  },
  {
    path : 'register',
    component:RegisterComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
