import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';

import { Anime } from '@js-camp/core/models/anime';
import { Observable, combineLatest, BehaviorSubject, filter, switchMap, map } from 'rxjs';

import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

import { MatSelectChange } from '@angular/material/select';

import { HttpParams } from '@angular/common/http';

import { AnimeService } from '../../../../../core/services/anime.service';

import { PaginationComponent } from '../pagination/pagination.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Pagination } from '@js-camp/core/models/pagination';

/** */
export interface UrlParams {

  /** Input name. */
  [inputName: string]: string;
}

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
    'title_eng',
    'title_jpn',
    'aired__startswith',
    'type',
    'status',
  ];

  /** Anime list. */
  public animeList!: Anime[];

  public paginationAndAnimeList!: Observable<Pagination<Anime[]>>;

  /** */
  public animeList$!: Observable<Anime[]>;

  /** */
  private paginationObserver$: BehaviorSubject<PageEvent>;

  /** */
  private sortingObserver$: BehaviorSubject<Sort>;

  /** */
  private filteringObserver$: BehaviorSubject<string[]>;

  /** */
  private searchObserver$: BehaviorSubject<string>;

  /** */
  public searchString: string;

  /** */
  @ViewChild(PaginationComponent) pagination!: PaginationComponent;

  public constructor(
    private readonly animeService: AnimeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log('constr');
    this.paginationObserver$ = new BehaviorSubject<PageEvent>({
      length: 0,
      pageSize: 0,
      pageIndex: 0,
      previousPageIndex: 0,
    });
    this.sortingObserver$ = new BehaviorSubject<Sort>({
      active: '',
      direction: '',
    });
    this.filteringObserver$ = new BehaviorSubject<string[]>([]);
    this.searchObserver$ = new BehaviorSubject<string>('');
    this.searchString = '';
  }

  /**
   * @param event
   */
  public handlePaginationClick(event: PageEvent): void {
    this.paginationObserver$.next(event);
    this.getAnimeList();
  }

  /**
   * @param event
   */
  public handleFilteringSelect(event: MatSelectChange): void {
    //console.log(event);
    this.filteringObserver$.next(event.value);
    this.resetPaginationToFirstPage();
    this.getAnimeList();
  }

  /**
   * @param event
   */
  public handleSortClick(event: Sort): void {
    //console.log(event);
    this.sortingObserver$.next(event);
    if (event.direction === 'desc') {
      event.active = `-${event.active}`;
    }
    if (event.direction === '') {
      event.active = 'id';
    }
    this.resetPaginationToFirstPage();
    this.getAnimeList();
  }

  /** */
  public handleSearchClick(): void {
    this.searchObserver$.next(this.searchString);
    this.resetPaginationToFirstPage();
    this.getAnimeList();
    //console.log(this.searchString);
  }

  /** */
  private getAnimeList(): void {
    this.animeService.getPaginationAndAnimeList().subscribe(response => {
      this.animeList = response.results;
      this.pagination.setLength(response.count);
    });
  }

  ngOnInit() {}

  handleTableChanges() {
    let paramObject: UrlParams = {};

    combineLatest([
      this.paginationObserver$,
      this.sortingObserver$,
      this.searchObserver$,
      this.filteringObserver$,
    ]).subscribe(([paginationEvent, sortingEvent, searchEvent, filterEvent]) => {

    })
  }

  /** */
  private resetPaginationToFirstPage(): void {
    this.paginationObserver$.next({
      length: 0,
      pageSize: 0,
      pageIndex: 0,
      previousPageIndex: 0,
    });
    this.pagination.resetToFirstPage();
  }
}
