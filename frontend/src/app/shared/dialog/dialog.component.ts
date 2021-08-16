// Reference: https://github.com/allabouttech0803/angular-reusable-dialog/blob/main/src/app/components/shared/dialog/dialog.component.html
import { Component, Inject, OnInit, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StateService } from 'src/app/shared/state.service';
import { DialogInterface } from '../interfaces/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public dialogData: DialogInterface,
    public stateService: StateService,
    private ngZone: NgZone
  ) {}
  ngOnInit(): void {}

  handleDialogConfirm() {
    this.stateService.isAsyncOperationRunning$.next(true);
    setTimeout(() => {
    // this.ngZone.run(() => {

      this.dialogData.callbackMethod();
      this.stateService.isAsyncOperationRunning$.next(false);
    }, 500);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}