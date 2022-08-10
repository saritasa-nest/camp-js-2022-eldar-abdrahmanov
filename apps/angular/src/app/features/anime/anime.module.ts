import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PaginationComponent } from './components/pagination/pagination.component';
import { FilteringComponent } from './components/filtering/filtering.component';
import { AnimeTableComponent } from './components/anime-table/anime-table.component';

/** Anime module. */
@NgModule({
  declarations: [AnimeTableComponent],
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule],
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
