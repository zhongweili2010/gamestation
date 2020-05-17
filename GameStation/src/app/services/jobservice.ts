import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Job } from '../domain/job';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};


@Injectable()
export class JobService {

  constructor(private http: HttpClient) { }

  getJobs() {
    return this.http.get<any>('assets/data/jobs.json')
      .toPromise()
      .then(res => <Job[]>res.data)
      .then(data => data);
  }

  listJob(): Observable<any> {
    return this.http.get('https://bione.bnga.com/BIOne/rest/quartz/listJob');
  }

  addJob(job: Job): Observable<any> {
    return this.http.post("https://bione.bnga.com/BIOne/rest/quartz/addJobJson", JSON.stringify(job), httpOptions).pipe(
      catchError(this.handleError<any>('add'))
    );
  }

  editTrigger(job: Job): Observable<any> {
    return this.http.put("https://bione.bnga.com/BIOne/rest/quartz/editJobJson", JSON.stringify(job), httpOptions).pipe(
      catchError(this.handleError<any>('add'))
    );
  }

  runJobNow(jobGroup: string, job: string): Observable<any> {
    return this.http.put(`https://bione.bnga.com/BIOne/rest/quartz/runJobNow/${jobGroup}/${job}`, null, httpOptions).pipe(
      catchError(this.handleError<any>('run'))
    );
  }

  resumeJob(jobGroup: string, job: string): Observable<any> {
    return this.http.put(`https://bione.bnga.com/BIOne/rest/quartz/resumeJob/${jobGroup}/${job}`, null, httpOptions).pipe(
      catchError(this.handleError<any>('resume'))
    );
  }

  disableJob(jobGroup: string, job: string): Observable<any> {
    return this.http.put(`https://bione.bnga.com/BIOne/rest/quartz/disable/${jobGroup}/${job}`, null, httpOptions).pipe(
      catchError(this.handleError<any>('disable'))
    );
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
}