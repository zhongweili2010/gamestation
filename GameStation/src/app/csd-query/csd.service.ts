import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable()
export class CsdService {

  constructor(private http: HttpClient) { }

  getSummary() {
    return this.http.get<any>(`http://localhost:8080/rest/csd/getSummary`);
  }

  etl(account: string, startDate: string, endDate: string): Observable<any> {
    return this.http.post(`http://localhost:8080/rest/csd/etl/${account}/${startDate}/${endDate}`, null, httpOptions).pipe(
      catchError(this.handleError<any>('run'))
    );
  }

  extractNewTitles(): Observable<any> {
    return this.http.post(`http://localhost:8080/rest/csd/extractNewTitles`, null, httpOptions).pipe(
      catchError(this.handleError<any>('run'))
    );
  }


  fileUpload(url: string, formData: FormData) {
    return this.http.post<any>(url, formData, {
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/*',
        'Access-Control-Allow-Origin': '*',
      })
    }).pipe(
      catchError(this.handleError<any>('run'))
    );
  }

  public upload(url: string, formData: FormData) {
    return this.http.post<any>(url, formData);
  }


  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  preview(startDate?: string, endDate?: string) {
    return this.http.get(`http://localhost:9090/rest/hardware/query/${startDate}/${endDate}`);
  }


  downloadExcel(fileName: string, startDate?: string, endDate?: string) {
    return this.http.get(`http://localhost:9090/rest/csd/downloadExcel`, { params: { fileName: `${fileName}`, startDate: `${startDate}`, endDate: `${endDate}` }, responseType: 'blob' });
  }
  lazyLoad(sql: string, event: string) {
    return this.http.get(`http://localhost:9090/rest/csd/lazyLoad`, { params: { sql: `${sql}`, event: `${event}` } });  //, responseType: "text" });
  }
}
