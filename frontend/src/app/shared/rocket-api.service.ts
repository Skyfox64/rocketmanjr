import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { API_URL } from '../../environments/environment';

export interface RocketResultItem {}

@Injectable()
export class RocketApiService {
  constructor(private httpClient: HttpClient) {}

  getResults(searchTerm: string): Observable<string> {
    // return this.httpClient.get<string>(API_URL + "/" + searchTerm)
    return this.httpClient.get<string>(API_URL + "/" + searchTerm +"?timestamp=true")
      .pipe(
        // catchError(() => EMPTY)
        catchError(this.handleError<string>('getResults', ''))
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
      // console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
