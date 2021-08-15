import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import {API_URL} from '../../environments/environment';

type DateString = string; // "2014-12-09T13:50:51.644000Z"

export interface RocketResult {
  value: number;
  node: string;
  created: DateString;
}

export interface RocketResultItem {}

export interface Node {
  id: number;
  created_at: DateString;
}

export interface Property {
  id: number;
  created_at: DateString;
  value: number;
}

@Injectable()
export class RocketApiService {
  constructor(private httpClient: HttpClient) {}

  getResults(searchTerm: string): Observable<Node[]> {
    return this.httpClient.get<Node[]>(API_URL + "/" + searchTerm +"?timestamp=true")
      .pipe(
        // catchError(() => EMPTY)
        catchError(this.handleError<Node[]>('getResults', []))
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
