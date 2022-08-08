import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Anime } from '@js-camp/core/models/anime';
import { Observable } from 'rxjs';

import { AnimeService } from '../../../../../core/services/anime.service';

/** Anime table component. */
@Component({
  selector: 'anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AnimeTableComponent {

  /** Titles of table columns. */
  public readonly displayedColumns = [
    'image',
    'titleEng',
    'titleJpn',
    'airedStart',
    'type',
    'status',
  ] as const;

  /** Anime list. */
  public readonly animeList$: Observable<readonly Anime[]>;

  public constructor(private readonly animeService: AnimeService) {
    this.animeList$ = animeService.getAnimeList();
  }

  /**
   * Return index of item.
   * @param index Serial number.
   * @param item Anime instance.
   */
  public trackBy(index: number, item: Anime): number {
    return item.id;
  }
}
