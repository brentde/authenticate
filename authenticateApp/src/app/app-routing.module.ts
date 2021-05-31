import { RegisterComponent } from './structure/register/register.component';
import { HomeComponent } from './structure/home/home.component';
import { LoginComponent } from './structure/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'  },
  { path: 'login', component: LoginComponent  },
  { path: 'home', component: HomeComponent  },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
