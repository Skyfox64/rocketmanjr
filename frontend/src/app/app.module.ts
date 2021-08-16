import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TimeAgoPipe } from 'time-ago-pipe';

import { SearchInputComponent } from './search-input/search-input.component';
import { ClientSwitchmapComponent } from './client-switchmap/client-switchmap.component';
import { PrettyPrintPipe } from './pretty-print/pretty-print.pipe';
import { TreeFlatComponent } from './tree-flat/tree-flat.component';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    CdkTableModule,
    CdkTreeModule,
    MatGridListModule,
    MatButtonModule,
    MatTreeModule,
    MatIconModule,
    ScrollingModule
  ],
  providers: [
    RocketApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
