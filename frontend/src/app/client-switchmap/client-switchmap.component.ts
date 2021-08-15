import { Component } from "@angular/core";
import { EMPTY, Observable, Subject } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { RocketApiService, RocketResult, Node } from '../shared/rocket-api.service';

@Component({
  selector: "app-client-switchmap",
  templateUrl: "./client-switchmap.component.html",
  styleUrls: ["./client-switchmap.component.css"]
})
export class ClientSwitchmapComponent {
  searchTerm = new Subject<string>();
  results$: Observable<Node[]> = this.searchTerm.pipe(
    switchMap(searchTerm => {
      return this.RocketApiService.getResults(searchTerm)
        // .pipe(
        //   catchError(() => EMPTY)
        // )
    }),
  );

  constructor(private RocketApiService: RocketApiService) {}

  onTextChange(changedText: string) {
    this.searchTerm.next(changedText);
  }
}
