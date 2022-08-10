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
  public readonly animeList$: Observable<Anime[]>;

  public constructor(private readonly animeService: AnimeService) {
    this.animeList$ = animeService.getAnimeList();
  }

  /**
   * Track items in the array by specified key.
   * @param _ Index of anime in array.
   * @param item Anime instance.
   */
  public trackBy(_: number, item: Anime): number {
    return item.id;
  }
}
