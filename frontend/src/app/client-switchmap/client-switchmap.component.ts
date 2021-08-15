import { Component } from "@angular/core";
import { empty, EMPTY, Observable, of, Subject } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { RocketApiService, RocketResult } from '../shared/rocket-api-service.service';

@Component({
  selector: "app-client-switchmap",
  templateUrl: "./client-switchmap.component.html",
  styleUrls: ["./client-switchmap.component.css"]
})
export class ClientSwitchmapComponent {
  searchTerm = new Subject<string>();
  results$ = this.searchTerm.pipe(
    switchMap(searchTerm => {
      return this.RocketApiService.getResults(searchTerm).pipe(
        catchError((error) => of(null)))
    })
  );

  constructor(private RocketApiService: RocketApiService) {}

  onTextChange(changedText: string) {
    this.searchTerm.next(changedText);
  }
}
