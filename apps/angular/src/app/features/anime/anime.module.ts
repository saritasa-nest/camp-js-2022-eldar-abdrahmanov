import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { PaginationComponent } from './components/pagination/pagination.component';
import { FilteringComponent } from './components/filtering/filtering.component';
import { AnimeTableComponent } from './components/anime-table/anime-table.component';

/** Anime module. */
@NgModule({
  declarations: [
    AnimeTableComponent,
    PaginationComponent,
    FilteringComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  exports: [AnimeTableComponent],
})
export class AnimeModule { }
