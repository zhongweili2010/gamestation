import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GameStation';
  items1: MenuItem[] = [
    // { label: 'Login', routerLink: '/login' },
    { label: 'Home', routerLink: '/home' },
    { label: 'demo', routerLink: '/demo' },
    { label: 'query', routerLink: '/csd' },
    { label: 'upload', routerLink: '/hyp' },
    { label: 'Logout', routerLink: '/error' }
  ];

  public isLoggedIn(): boolean {
    if (localStorage.getItem('isLoggedIn') == "true") {
      return true;
    }
    return false;
  }
}