import { Component, OnInit } from '@angular/core';
import { AppService } from '../login/app.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { MessageService, ConfirmationService } from 'primeng/api';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AppService, MessageService]
})
export class HomeComponent implements OnInit {
  pf = {
    email: '',
    first_name: '',
    last_name: '',
    username: '',
  };

  constructor(private app: AppService, private http: HttpClient, private messageService: MessageService) {
  }

  ngOnInit() {
    this.app.getUser("Wayne").subscribe(d => {
      this.pf = JSON.parse(d)
    });
  }

  doUpdate() {
    this.app.updateUser(this.pf.username, this.pf).subscribe(
      (d: any) => {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: d });
      },
      (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err });
      }
    );
  }
}

