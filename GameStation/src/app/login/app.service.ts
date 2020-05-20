import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {

    authenticated = false;

    constructor(private http: HttpClient) { }

    public login(username: string, password: string) {
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
        return this.http.get(`http://localhost:9090/rest/hardware/user/login/${username}/${password}`);
    }

    public getUser(username: string) {
        return this.http.get(`http://localhost:9090/rest/hardware/user/query/${username}`, { responseType: 'text' });
    }

    public updateUser(username: string, user: any) {
        return this.http.patch(`http://localhost:9090/rest/hardware/user/update/${username}`, user, { responseType: 'text' });
    }

    public signup(info: any) {
        return this.http.post(`http://localhost:9090/rest/hardware/sign`, info, { responseType: 'text' });
    }

    public signupDB(info: any) {
        return this.http.post(`http://localhost:9090/rest/hardware/user/add`, info, { responseType: 'text' });
    }
}