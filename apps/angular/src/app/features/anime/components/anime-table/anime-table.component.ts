import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Anime } from '@js-camp/core/models/anime';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';

import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

import { MatSelectChange } from '@angular/material/select';

import { AnimeService } from '../../../../../core/services/anime.service';
import { HttpParams } from '@angular/common/http';
import { offset } from '@nrwl/workspace/src/utils/ast-utils';

/** Anime table component. */
@Component({
  selector: 'anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements OnInit {
  /** Titles of table columns. */
  public readonly displayedColumns = [
    'image',
    'title_Eng',
    'title_Jpn',
    'aired__startswith',
    'type',
    'status',
  ];

  /** Anime list. */
  public animeList!: Anime[];

  /** */
  public animeList$!: Observable<Anime[]>;

  /** */
  public totalCountAnime!: number;

  /** */
  private paginationObserver$: BehaviorSubject<string>;

  /** */
  private sortingObserver$: BehaviorSubject<string[]>;

  /** */
  private filteringObserver$: BehaviorSubject<string[]>;

  /** */
  private searchObserver$: BehaviorSubject<string>;

  /** */
  public searchString: string;

  public constructor(private readonly animeService: AnimeService) {
    this.paginationObserver$ = new BehaviorSubject<string>('');
    this.sortingObserver$ = new BehaviorSubject<string[]>([]);
    this.filteringObserver$ = new BehaviorSubject<string[]>([]);
    this.searchObserver$ = new BehaviorSubject<string>('');
    this.searchString = '';
  }

  /**
   * @param event
   */
  public handlePaginationClick(event: PageEvent): void {
    const offset = event.pageIndex * event.pageSize;
    this.animeService.setOffsetParam(event.pageIndex * event.pageSize);
    this.getAnimeList();
    this.paginationObserver$.next(offset.toString());
  }

  /**
   * @param event
   */
  public handleFilteringSelect(event: MatSelectChange): void {
    this.filteringObserver$.next(event.value);
  }

  /**
   * @param event
   */
  public handleSortClick(event: Sort):void {
    this.sortingObserver$.next([event.direction, event.active]);
  }

  /** */
  public handleSearchClick(): void {
    this.searchObserver$.next(this.searchString);
    console.log(this.searchString);
  }

  /** */
  private getAnimeList(): void {
    this.animeService.getPaginationAndAnimeList().subscribe(response => {
      this.animeList = response.results;
      this.totalCountAnime = response.count;
    });
  }

  ngOnInit() {
    combineLatest([
      this.paginationObserver$,
      this.sortingObserver$,
      this.filteringObserver$,
      this.searchObserver$,
    ]).subscribe(([offset, ordering, type, search]) => {
      console.log(offset, ordering, type, search))
      this.animeService.httpParams = new HttpParams().set('offset', offset)
    }
    this.getAnimeList();
  }
}
