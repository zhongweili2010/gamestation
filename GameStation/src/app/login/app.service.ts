import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {

    authenticated = false;

    constructor(private http: HttpClient) { }

    public login(username: string, password: string) {
        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
        return this.http.get("http://localhost:3166/", { headers, responseType: 'test' as 'json' });
    }

    public getUser() {
        let username = 'user';
        let password = '123';
        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
        return this.http.get("http://localhost:3166/user", { headers });
    }
}