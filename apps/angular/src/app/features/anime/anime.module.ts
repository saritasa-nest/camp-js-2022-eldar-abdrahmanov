import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { AnimeTableComponent } from './components/anime-table/anime-table.component';

/** Anime module. */
@NgModule({
  declarations: [AnimeTableComponent],
  imports: [CommonModule, MatTableModule],
  exports: [AnimeTableComponent],
})
export class AnimeModule { }
