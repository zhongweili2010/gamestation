import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppService } from './login/app.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent {
  constructor(private service: AppService, private router: Router) {
  }

  title = 'GameStation';
  items1: MenuItem[] = [
    // { label: 'Login', routerLink: '/login' },
    { label: 'Home', routerLink: '/home' },
    // { label: 'demo', routerLink: '/demo' },
    { label: 'query', routerLink: '/csd' },
    { label: 'upload', routerLink: '/hyp' },
    {
      label: 'Logout', command: (event) => {
        this.doLogout();
      }
    }
  ];

  public isLoggedIn(): boolean {
    if (localStorage.getItem('isLoggedIn') == "true") {
      return true;
    }
    return false;
  }

  public doLogout() {
    //TODO: service.doSomething...
    localStorage.setItem("isLoggedIn", "false");
    this.router.navigate(['/login']);
  }
}