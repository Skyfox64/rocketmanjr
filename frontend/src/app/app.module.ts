import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { SearchInputComponent } from './search-input/search-input.component';
import { ClientSwitchmapComponent } from './client-switchmap/client-switchmap.component';
import { RocketApiService } from './shared/rocket-api-service.service';
import { PrettyPrintPipe } from './pretty-print.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ClientSwitchmapComponent,
    SearchInputComponent,
    PrettyPrintPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    RocketApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
