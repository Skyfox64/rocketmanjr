// Imports
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Our components
import { SearchInputComponent } from './search-input/search-input.component';
import { ClientSwitchmapComponent } from './client-switchmap/client-switchmap.component';
import { TreeFlatComponent } from './tree-flat/tree-flat.component';
import { DialogComponent } from './shared/dialog/dialog.component';

// Our Pipes
import { PrettyPrintPipe } from './pretty-print/pretty-print.pipe';
import { MessageTimePipe } from './MessageTime/message-time.pipe';

// Our Services
import { RocketApiService } from './shared/rocket-api.service';
import { StateService } from './shared/state.service';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    CdkTableModule,
    CdkTreeModule,
    ScrollingModule,

    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatTreeModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    AppComponent,
    ClientSwitchmapComponent,
    SearchInputComponent,
    PrettyPrintPipe,
    TreeFlatComponent,
    MessageTimePipe,
    DialogComponent,
  ],
  entryComponents: [
    DialogComponent,
  ],
  providers: [
    RocketApiService,
    StateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
