import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../shared/shared.module';

import { AnimeModule } from './features/anime/anime.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/** App module. */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    AnimeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
