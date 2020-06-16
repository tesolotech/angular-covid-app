import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';

const data = {
  Name:'Vikash',
  Age:24,
  Skill:['Angular js', 'Nodejs', 'Mongodb', 'Cauchbase', 'HTML','CSS']
}

@Injectable({
  providedIn: 'root'
})
export class Covid19Service {
  private serverUrl = 'https://api.covid19api.com/summary';  // URL to web api

  constructor(private http: HttpClient) { }

  // http://localhost:3000/api/users
  GetAllCovidData(): Observable<any> {
    return this.http.get<any[]>(this.serverUrl).pipe(catchError(this.handleError));
    // return data;
  }

  // Handle Error
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error is occoured', error.error.message);
    } else {
      console.error(`Backend return code ${error.status}`);
    }
    return throwError('Something happened bad,Try again later');
  }

}
