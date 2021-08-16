import { Component } from "@angular/core";
import { EMPTY, Observable, Subject } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { RocketApiService } from '../shared/rocket-api.service';

@Component({
  selector: "app-client-switchmap",
  templateUrl: "./client-switchmap.component.html",
  styleUrls: ["./client-switchmap.component.css"]
})
export class ClientSwitchmapComponent {
  searchTerm = new Subject<string>();
  results$: Observable<string> = this.searchTerm.pipe(
    switchMap(searchTerm => {
      return this.RocketApiService.getResults(searchTerm)
    }),
  );

  constructor(private RocketApiService: RocketApiService) {}

  onTextChange(changedText: string) {
    this.searchTerm.next(changedText);
  }
}
