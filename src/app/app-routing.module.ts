import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HighchartsComponent } from './components/main/highcharts/highcharts.component';
import { MainComponent } from './components/main/main/main.component';
import { TableComponent } from './components/main/table/table.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { GuardService } from './services/guard.service';

const routes: Routes = [
  {path: '',
pathMatch:'full',
component: HomeComponent
},
{
  path: 'confirm',
  component: TableComponent,
  canActivate: [GuardService]
},
{
path: 'login',
component: LoginComponent
},
{
path: 'sign-up',
component: SignUpComponent
},
{
  path: 'home',
  component:HomeComponent
},
{
  path: 'charts',
  component:HighchartsComponent,
  canActivate: [GuardService]
},
{
  path: 'main',
  component:MainComponent,
  canActivate: [GuardService]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
