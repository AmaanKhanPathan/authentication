import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AuthGuard } from './guard/auth.guard';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  { path : '', component : HomeComponent, canActivate:[AuthGuard]},
  { path : 'register', component : RegisterComponent},
  { path : 'login', component : LoginComponent},
  { path : 'userList', component : UserListComponent, canActivate:[AuthGuard]},
  { path : 'customers', component : CustomersComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
