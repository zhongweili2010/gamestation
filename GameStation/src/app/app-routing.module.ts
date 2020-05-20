import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { DemoComponent } from './demo/demo.component';
import { HypDashboardComponent } from './hyp-dashboard/hyp-dashboard.component';
import { CsdQueryComponent } from './csd-query/csd-query.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'demo',
    component: DemoComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'upload',
    component: HypDashboardComponent
  },
  {
    path: 'query',
    component: CsdQueryComponent
  },
  {
    path: 'error',
    component: ErrorPageComponent
  },
  {
    path: '**',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
