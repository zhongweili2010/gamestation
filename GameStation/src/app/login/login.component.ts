import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { debug } from 'util';
import { MessageService } from 'primeng/api';

@Component({
  templateUrl: './login.component.html',
  providers: [AppService, MessageService]
})
export class LoginComponent {

  username: string;
  password: string;
  message: any;
  displayDialog: boolean = false;

  info = {
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: ''
  };


  constructor(private service: AppService, private router: Router, private messageService: MessageService) {
  }

  public doLogin() {
    let resp = this.service.login(this.username, this.password);
    resp.subscribe((data: any) => {
      console.log(data);
      if (data.result) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", data.username);
        this.router.navigate(['/home']);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: data });
      }
    })
  }

  save() {
    this.service.signup(this.info).subscribe(
      (d: any) => {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: d });
      },
      (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err });
      },
      () => {
        this.displayDialog = false;
      }
    );

    this.service.signupDB(this.info).subscribe(
      (d: any) => {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: d });
      },
      (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err });
      },
      () => {
        this.displayDialog = false;
      }
    );
  }
}