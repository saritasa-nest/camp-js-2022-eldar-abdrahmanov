import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AnimeTableComponent } from './components/anime-table/anime-table.component';

/** Anime module. */
@NgModule({
  declarations: [AnimeTableComponent],
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule],
  exports: [AnimeTableComponent],
})
export class AnimeModule { }
