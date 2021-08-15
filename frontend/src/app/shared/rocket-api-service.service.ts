import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import {API_URL} from '../../environments/environment';

type DateString = string; // "2014-12-09T13:50:51.644000Z"

export interface RocketResult {
  value: number;
  node: string;
  created: DateString;
}

export interface RocketRsultItem {}

// only partial type
export interface RocketResult {
  count: number;
  results: RocketResult[];
}

@Injectable()
export class RocketApiService {
  constructor(private httpClient: HttpClient) {}

  getResults(searchTerm: string): Observable<RocketResult> {
    let x = this.httpClient.get<RocketResult>(
      API_URL + "/" + searchTerm
    );
    console.log(x);
    return x
      // "https://swapi.dev/api/people/?search=" + searchTerm
  }
}
