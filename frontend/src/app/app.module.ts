import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatGridListModule } from '@angular/material/grid-list';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SearchInputComponent } from './search-input/search-input.component';
import { ClientSwitchmapComponent } from './client-switchmap/client-switchmap.component';
import { PrettyPrintPipe } from './pretty-print/pretty-print.pipe';
import { TreeFlatComponent } from './tree-flat/tree-flat.component';
import { DialogComponent } from './shared/dialog/dialog.component';

import { RocketApiService } from './shared/rocket-api.service';
import { MessageTimePipe } from './MessageTime/message-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ClientSwitchmapComponent,
    SearchInputComponent,
    PrettyPrintPipe,
    TreeFlatComponent,
    MessageTimePipe,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    CdkTableModule,
    CdkTreeModule,
    ScrollingModule,

    FormsModule,
    MatGridListModule,
    MatTreeModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    RocketApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
