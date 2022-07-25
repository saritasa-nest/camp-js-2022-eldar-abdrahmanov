import { Component } from '@angular/core';

import { Anime } from '@js-camp/core/models/anime';
import { Observable } from 'rxjs';

import { AnimeService } from '../../../../../core/services/anime.service';

/** Anime table component. */
@Component({
  selector: 'anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
})

export class AnimeTableComponent {

  /** Titles of table columns. */
  public displayedColumns: string[] = [
    'image',
    'titleEng',
    'titleJpn',
    'airedStart',
    'type',
    'status',
  ];

  /** Anime list. */
  public animeList$: Observable<readonly Anime[]>;

  public constructor(private animeService: AnimeService) {
    this.animeList$ = animeService.getAnimeList();
  }
}
