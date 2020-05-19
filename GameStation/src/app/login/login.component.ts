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
    resp.subscribe(data => {
      console.log(data);
      localStorage.setItem("isLoggedIn", "true");
      this.router.navigate(['/home']);
    })
  }

  save() {
    // this.service.update(this.info).subscribe(
    //   (d: any) => {
    //     this.messageService.add({ severity: 'success', summary: 'Service Message', detail: d });
    //   },
    //   (err: any) => {
    //     this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err });
    //   },
    //   () => {
    //     this.displayDialog = false;
    //   }
    // );
  }
}