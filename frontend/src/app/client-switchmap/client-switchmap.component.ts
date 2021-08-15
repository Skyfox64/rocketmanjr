import { Component } from "@angular/core";
import { EMPTY, Observable, of, Subject } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { RocketApiService, RocketResult } from '../shared/rocket-api-service.service';


@Component({
  selector: "app-client-switchmap",
  templateUrl: "./client-switchmap.component.html",
  styleUrls: ["./client-switchmap.component.css"]
})
export class ClientSwitchmapComponent {
  searchTerm = new Subject<string>();
  results$: Observable<RocketResult|null> = this.searchTerm.pipe(
    switchMap(searchTerm => this.RocketApiService.getResults(searchTerm)),
    
    catchError(errorResponse => {
      if (errorResponse.status === 404) {
          //DO SOMETHING
      } 
      // return of([]);
      return EMPTY;
      // alert("oh no, there was an error when calling the api");
      console.error(errorResponse);
      // return of(null);
    })
  );

  constructor(private RocketApiService: RocketApiService) {}

  onTextChange(changedText: string) {
    this.searchTerm.next(changedText);
  }
}
