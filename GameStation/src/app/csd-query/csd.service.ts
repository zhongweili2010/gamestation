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

  delete(items: any[]) {
    return this.http.post(`http://localhost:9090/rest/hardware/delete`, { delete: items });
  }

  update(item: any) {
    return this.http.patch(`http://localhost:9090/rest/hardware/patch/${item.id}`, item);
  }
}
