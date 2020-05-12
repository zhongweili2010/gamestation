import { Component, OnInit } from '@angular/core';
import { AppService } from '../login/app.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

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
  providers: [AppService]
})
export class HomeComponent implements OnInit {

  constructor(private app: AppService, private http: HttpClient) {
  }

  ngOnInit() {
  }

}