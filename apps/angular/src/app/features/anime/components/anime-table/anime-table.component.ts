import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';

import { Anime } from '@js-camp/core/models/anime';
import { Observable, combineLatest, BehaviorSubject, filter, switchMap, map, of } from "rxjs";

import { PageEvent } from '@angular/material/paginator';
import { Sort, SortHeaderArrowPosition } from "@angular/material/sort";

import { MatSelectChange } from '@angular/material/select';

import { HttpParams } from '@angular/common/http';

import { Pagination } from '@js-camp/core/models/pagination';
import { ActivatedRoute, Router } from '@angular/router';

import { PaginationComponent } from '../pagination/pagination.component';
import { AnimeService } from '../../../../../core/services/anime.service';

/** */
export interface UrlParams {

  /** Input name. */
  [inputName: string]: string;
}

interface PaginationParams {
  limit: string;
  offset: string;
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

  /** */
  public par$ = new Observable<UrlParams>();

  /** Anime list. */
  public animeList!: Anime[];

  public urlParams: UrlParams;
  public sortingDirection: SortHeaderArrowPosition;
  public paginationAndAnimeList!: Observable<Pagination<Anime[]>>;

  /** */
  public animeList$!: Observable<Anime[]>;

  /** */
  private paginationObserver$: BehaviorSubject<PaginationParams>;

  /** */
  private sortingObserver$: BehaviorSubject<Sort>;

  /** */
  private filteringObserver$: BehaviorSubject<string[]>;

  /** */
  private searchObserver$: BehaviorSubject<string>;

  /** */
  public searchString: string;

  /** */
  @ViewChild(PaginationComponent) paginationComponent!: PaginationComponent;

  public constructor(
    private readonly animeService: AnimeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.urlParams = {};
    this.route.queryParamMap.subscribe(param => {
      param.keys.map(key => {
        this.urlParams[key] = param.get(key) as string;
      });

      this.animeService.httpParams = new HttpParams().appendAll(this.urlParams);
      this.getAnimeList();

      // console.log(urlParams)
    });
    this.paginationObserver$ = new BehaviorSubject<PaginationParams>({
      limit: this.urlParams['limit'] ? this.urlParams['limit'] : '25',
      offset: this.urlParams['offset'] ? this.urlParams['offset'] : '0',
    });
    this.sortingObserver$ = new BehaviorSubject<Sort>({
      active: this.urlParams['ordering'] ? this.urlParams['ordering'] : 'id',
      direction: '',
    });
    this.filteringObserver$ = new BehaviorSubject<string[]>(
      this.urlParams['type__in'] ? this.urlParams['type__in'].split(',') : [],
    );
    this.searchObserver$ = new BehaviorSubject<string>(
      this.urlParams['search'] ? this.urlParams['search'] : '',
    );
    this.searchString = this.urlParams['search'] ? this.urlParams['search'] : '';
  }

  ngOnInit() {
    this.handleChanges();
  }

  ngAfterViewInit() {
    this.paginationComponent.pageSize = Number(this.urlParams['limit']);
    this.paginationComponent.pageIndex = Number(this.urlParams['offset']) / Number(this.urlParams['limit'])
  }

  /**
   * @param event
   */
  public handlePaginationClick(event: PageEvent): void {
    this.paginationObserver$.next({
      limit: event.pageSize.toString(),
      offset: (event.pageSize * event.pageIndex).toString(),
    });
  }

  /**
   * @param event
   */
  public handleFilteringSelect(event: MatSelectChange): void {
    console.log(event);
    this.filteringObserver$.next(event.value);
    this.resetPaginationToFirstPage();
  }

  /**
   * @param event
   */
  public handleSortClick(event: Sort): void {
    // console.log(event);

    if (event.direction === 'asc') {
      event.active = `-${event.active}`;
    }
    if (event.direction === '') {
      event.active = 'id';
    }
    this.sortingObserver$.next(event);
    this.resetPaginationToFirstPage();
  }

  /** */
  public handleSearchClick(): void {
    this.searchObserver$.next(this.searchString);
    this.resetPaginationToFirstPage();
    // console.log(this.searchString);
  }

  /** */
  private getAnimeList(): void {
    this.animeService.getPaginationAndAnimeList().subscribe(response => {
      this.animeList = response.results;
      this.paginationComponent.setLength(response.count);
    });
  }



  handleChanges() {
    combineLatest([
      this.paginationObserver$,
      this.sortingObserver$,
      this.searchObserver$,
      this.filteringObserver$,
    ]).subscribe(
      ([paginationEvent, sortingEvent, searchEvent, filterEvent]) => {
        const httpParams = new HttpParams()
          .set('limit', paginationEvent.limit)
          .set('offset', paginationEvent.offset)
          .set('ordering', sortingEvent.active)
          .set('type__in', filterEvent.join(','))
          .set('search', searchEvent);
        httpParams.keys().map(key => {
          if (httpParams.get(key) !== '') {
            this.urlParams[key] = httpParams.get(key) as string;
          }
        });
        console.log(this.urlParams);

        this.router.navigate([], { queryParams: this.urlParams });
      },
    );
  }

  private resetPaginationToFirstPage(): void {
    this.paginationObserver$.next({
      limit: '25',
      offset: '0',
    });
    this.paginationComponent.resetToFirstPage();
  }
}
