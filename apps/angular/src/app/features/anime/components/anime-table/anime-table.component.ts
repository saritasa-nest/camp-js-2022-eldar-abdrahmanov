import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Anime } from '@js-camp/core/models/anime';
import { combineLatest, BehaviorSubject } from 'rxjs';

import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';

import { MatSelectChange } from '@angular/material/select';

import { HttpParams } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';

import { PaginationComponent } from '../pagination/pagination.component';
import { AnimeService } from '../../../../../core/services/anime.service';
import { FilteringComponent } from '../filtering/filtering.component';

/** Url parameters object. */
export interface UrlParams {

  /** Url parameters. */
  [inputName: string]: string;
}

interface PaginationUrlParams {

  /** Limit items on page. */
  readonly limit: string;

  /** Offset. */
  readonly offset: string;
}

const URL_PARAMS = {
  limit: 'limit',
  offset: 'offset',
  sort: 'ordering',
  filter: 'type__in',
  search: 'search',
};

const DEFAULT_PARAMS = {
  limit: '25',
  offset: '0',
  sort: 'id',
  filter: [],
  search: '',
};

/** Anime table component. */
@Component({
  selector: 'anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements OnInit, AfterViewInit {
  /** Id`s of table columns. */
  public readonly displayedColumns = [
    'image',
    'title_eng',
    'title_jpn',
    'aired__startswith',
    'type',
    'status',
  ];

  /** Anime list. */
  public animeList!: readonly Anime[];

  /** Url parameters. */
  public readonly urlParams: UrlParams;

  /** Active header id when sorting. */
  public activeSortHeader: string;

  /** Direction of active header id when sorting. 'asc' | 'desc' | '' .*/
  public directionSortHeader: SortDirection;

  /** Emits on pagination change. */
  private readonly pagination$: BehaviorSubject<PaginationUrlParams>;

  /** Emits on sorting change. */
  private readonly sorting$: BehaviorSubject<Sort>;

  /** Emits on filtering change. */
  private readonly filtering$: BehaviorSubject<string[]>;

  /** Emits on searching change. */
  private readonly search$: BehaviorSubject<string>;

  /** Search input value. */
  public searchString: string;

  /** Pagination component. */
  @ViewChild(PaginationComponent) private paginationComponent!: PaginationComponent;

  /** Filtering component. */
  @ViewChild(FilteringComponent) private filteringComponent!: FilteringComponent;

  public constructor(
    private readonly animeService: AnimeService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    this.urlParams = {};

    // subscribes to changing the router url parameters and downloads the anime list.
    this.route.queryParamMap.subscribe(param => {
      param.keys.map(key => {
        this.urlParams[key] = param.get(key) as string;
      });
      this.animeService.httpParams = new HttpParams().appendAll(this.urlParams);
      this.getAnimeList();
    });

    this.activeSortHeader = '';
    this.directionSortHeader = '';
    this.pagination$ = new BehaviorSubject<PaginationUrlParams>({
      limit: this.urlParams[URL_PARAMS.limit] ?
        this.urlParams[URL_PARAMS.limit] :
        DEFAULT_PARAMS.limit,
      offset: this.urlParams[URL_PARAMS.offset] ?
        this.urlParams[URL_PARAMS.offset] :
        DEFAULT_PARAMS.offset,
    });
    this.sorting$ = new BehaviorSubject<Sort>({
      active: this.urlParams[URL_PARAMS.sort] ?
        this.urlParams[URL_PARAMS.sort] :
        DEFAULT_PARAMS.sort,
      direction: '',
    });
    this.filtering$ = new BehaviorSubject<string[]>(
      this.urlParams[URL_PARAMS.filter] ?
        this.urlParams[URL_PARAMS.filter].split(',') :
        DEFAULT_PARAMS.filter,
    );
    this.search$ = new BehaviorSubject<string>(
      this.urlParams[URL_PARAMS.search] ?
        this.urlParams[URL_PARAMS.search] :
        DEFAULT_PARAMS.search,
    );
    this.searchString = this.urlParams[URL_PARAMS.search] ?
      this.urlParams[URL_PARAMS.search] :
      '';
  }

  /** A lifecycle hook. */
  public ngOnInit(): void {
    this.handleChanges();
  }

  /**
   * A lifecycle hook. Recreates the state of the page
   *  according to the parameters received from the url.
   */
  public ngAfterViewInit(): void {
    this.paginationComponent.pageSize = Number(
      this.urlParams[URL_PARAMS.limit],
    );
    this.paginationComponent.pageIndex =
      Number(this.urlParams[URL_PARAMS.limit]) /
      Number(this.urlParams[URL_PARAMS.limit]);
    if (this.urlParams[URL_PARAMS.sort] !== undefined) {
      this.activeSortHeader = this.urlParams[URL_PARAMS.sort];
      this.directionSortHeader = this.urlParams[URL_PARAMS.sort].startsWith('-') ?
        'asc' :
        'desc';
    }
    if (this.urlParams[URL_PARAMS.filter] !== undefined) {
      this.filteringComponent.setSelectedAnimeTypes(
        this.urlParams[URL_PARAMS.filter].split(','),
      );
    }
  }

  /**
   * Handle actions with pagination.
   * @param event Event received from Pagination component.
   */
  public handlePaginationClick(event: PageEvent): void {
    this.pagination$.next({
      limit: event.pageSize.toString(),
      offset: (event.pageSize * event.pageIndex).toString(),
    });
  }

  /**
   * Handle actions with pagination.
   * @param event Event received from Filtering component.
   */
  public handleFilteringSelect(event: MatSelectChange): void {
    this.filtering$.next(event.value);
    this.resetPaginationToFirstPage();
  }

  /**
   * Handle actions with sorting table headers.
   * Depending on the sort direction, adds a minus sign to the active heading parameter.
   * @param event Event received from table headers.
   */
  public handleSortClick(event: Sort): void {
    if (event.direction === 'desc') {
      event.active = `-${event.active}`;
    }
    if (event.direction === '') {
      event.active = DEFAULT_PARAMS.sort;
    }
    this.sorting$.next(event);
    this.resetPaginationToFirstPage();
  }

  /** Handle anime searching. */
  public handleSearchClick(): void {
    this.search$.next(this.searchString);
    this.resetPaginationToFirstPage();
  }

  /** Handle all actions on the page and configures the router's URL params. */
  private handleChanges(): void {
    combineLatest([
      this.pagination$,
      this.sorting$,
      this.search$,
      this.filtering$,
    ]).subscribe(
      ([paginationEvent, sortingEvent, searchEvent, filterEvent]) => {
        const httpParams = new HttpParams()
          .set(URL_PARAMS.limit, paginationEvent.limit)
          .set(URL_PARAMS.offset, paginationEvent.offset)
          .set(URL_PARAMS.sort, sortingEvent.active)
          .set(URL_PARAMS.filter, filterEvent.join(','))
          .set(URL_PARAMS.search, searchEvent);
        httpParams.keys().map(key => {
          if (httpParams.get(key) !== '') {
            this.urlParams[key] = httpParams.get(key) as string;
          }
        });
        this.router.navigate([], { queryParams: this.urlParams });
      },
    );
  }

  /** Get anime list. And set length of pagination. */
  private getAnimeList(): void {
    this.animeService.getPaginationAndAnimeList().subscribe(response => {
      this.animeList = response.results;
      this.paginationComponent.setLength(response.count);
    });
  }

  /** Reset pagination to the first page. */
  private resetPaginationToFirstPage(): void {
    this.pagination$.next({
      limit: DEFAULT_PARAMS.limit,
      offset: DEFAULT_PARAMS.offset,
    });
    this.paginationComponent.resetToFirstPage();
  }

  private resetToDefaultPage(): void {
    this.router.navigate([], {
      queryParams: {
        limit: '0',
        offset: '25',
        ordering: 'id',
      },
    });
  }
}
