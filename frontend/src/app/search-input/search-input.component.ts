import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.scss"]
})
export class SearchInputComponent implements OnInit, OnDestroy {
  @ViewChild('searchbtn') searchBtn!: ElementRef;
  @ViewChild('searchinput') searchInput!: ElementRef;
  @Input() initialValue: string = "";
  @Input() debounceTime = 300;

  @Output() textChange = new EventEmitter<string>();

  expanded: boolean = false;
  inputValue = new Subject<string>();
  trigger = this.inputValue.pipe(
    debounceTime(this.debounceTime),
    distinctUntilChanged()
  );

  subscriptions: Subscription[] = [];

  constructor() {}

  ngOnInit() {
    const subscription = this.trigger.subscribe(currentValue => {
      this.textChange.emit(currentValue);
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onInput(e: any) {
    this.inputValue.next(e.target.value);
  }

  toggleClass(e: any) {
    this.expanded = !this.expanded;
    if (!this.expanded) {
      this.handleClear();
    }
  }

  handleClear(){
    // this.inputValue = new Subject<string>()
    // this.initialValue = '';
    this.searchInput.nativeElement.value = '';
  }
}
