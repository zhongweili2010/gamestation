import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { debug } from 'util';

@Component({
  templateUrl: './login.component.html',
  providers: [AppService]
})
export class LoginComponent {

  username: string;
  password: string;
  message: any;

  constructor(private service: AppService, private router: Router) {
  }

  public doLogin() {
    let resp = this.service.login(this.username, this.password);
    resp.subscribe(data => {
      console.log(data);
      localStorage.setItem("isLoggedIn", "true");
      this.router.navigate(['/home']);
    })
  }
}