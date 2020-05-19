import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class HypDashboardService {
  url: string = 'http://localhost:3166/Smartflow';
  constructor(private http: HttpClient) { }

  listAll() {
    //return this.http.get(`${this.url}/rest/hyp/list`);

    return this.http.get<any>('assets/data/hyp.json');
  }

  downloadCsv(fileName: string) {
    return this.http.get(`${this.url}/rest/hyp/downloadCsv/${fileName}`, { responseType: 'blob' });
  }

  delete(fileName: string) {
    return this.http.delete(`${this.url}/rest/hyp/delete/${fileName}`);
  }

  fileUpload(formData: FormData) {
    return this.http.post<any>(`http://localhost:9090/rest/hardware/upload`, formData);
  }
}