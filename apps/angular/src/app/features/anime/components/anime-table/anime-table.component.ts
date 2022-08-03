import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Anime } from '@js-camp/core/models/anime';
import { combineLatest, BehaviorSubject, Subscription, Observable, map } from 'rxjs';

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
  [param: string]: string;
}

/** Pagination url parameters. */
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
} as const;

const URL_DEFAULT_PARAMS = {
  limit: '25',
  offset: '0',
  sort: 'id',
  filter: [],
  search: '',
} as const;

/** Anime table component. */
@Component({
  selector: 'anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AnimeTableComponent implements OnInit, AfterViewInit, OnDestroy {
  /** Id`s of table columns. */
  public readonly displayedColumns = [
    'image',
    'title_eng',
    'title_jpn',
    'aired__startswith',
    'type',
    'status',
  ] as const;

  /** Anime list observable. */
  public animeList$!: Observable<readonly Anime[]>;

  /** Url parameters. */
  public urlParams: UrlParams;

  /** Active header id when sorting. */
  public activeSortHeader: string;

  /** Direction of active header id when sorting. 'asc' | 'desc' | '' .*/
  public directionSortHeader: SortDirection;

  /** Emits on pagination change. */
  private readonly pagination$: BehaviorSubject<PaginationUrlParams>;

  /** Emits on sorting change. */
  private readonly sorting$: BehaviorSubject<Sort>;

  /** Emits on filtering change. */
  private readonly filtering$: BehaviorSubject<readonly string[]>;

  /** Emits on searching change. */
  private readonly search$: BehaviorSubject<string>;

  /** Search input value. */
  public searchString: string;

  private subscriptionOnChanges: Subscription;

  /** Pagination component. */
  @ViewChild(PaginationComponent)
  private paginationComponent!: PaginationComponent;

  /** Filtering component. */
  @ViewChild(FilteringComponent)
  private filteringComponent!: FilteringComponent;

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

    this.subscriptionOnChanges = new Subscription();
    this.activeSortHeader = '';
    this.directionSortHeader = '';
    this.pagination$ = new BehaviorSubject<PaginationUrlParams>({
      limit: this.urlParams[URL_PARAMS.limit] ?
        this.urlParams[URL_PARAMS.limit] :
        URL_DEFAULT_PARAMS.limit,
      offset: this.urlParams[URL_PARAMS.offset] ?
        this.urlParams[URL_PARAMS.offset] :
        URL_DEFAULT_PARAMS.offset,
    });
    this.sorting$ = new BehaviorSubject<Sort>({
      active: this.urlParams[URL_PARAMS.sort] ?
        this.urlParams[URL_PARAMS.sort] :
        URL_DEFAULT_PARAMS.sort,
      direction: '',
    });
    this.filtering$ = new BehaviorSubject<readonly string[]>(
      this.urlParams[URL_PARAMS.filter] ?
        this.urlParams[URL_PARAMS.filter].split(',') :
        URL_DEFAULT_PARAMS.filter,
    );
    this.search$ = new BehaviorSubject<string>(
      this.urlParams[URL_PARAMS.search] ?
        this.urlParams[URL_PARAMS.search] :
        URL_DEFAULT_PARAMS.search,
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
      Number(this.urlParams[URL_PARAMS.offset]) /
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
   * Return index of item.
   * @param index Serial number.
   * @param item Anime instance.
   */
  public trackBy(index: number, item: Anime): number {
    return item.id;
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
      event.active = URL_DEFAULT_PARAMS.sort;
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
    this.subscriptionOnChanges = combineLatest([
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
        this.urlParams = {};
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
    this.animeList$ = this.animeService.getPaginationAndAnimeList().pipe(
      map(response => {
        this.paginationComponent.setLength(response.count);
        return response.results;
      }),
    );
  }

  /** Reset pagination to the first page. */
  private resetPaginationToFirstPage(): void {
    this.pagination$.next({
      limit: URL_DEFAULT_PARAMS.limit,
      offset: URL_DEFAULT_PARAMS.offset,
    });
    this.paginationComponent.resetToFirstPage();
  }

  /** A lifecycle hook. Unsubscribe observables. */
  public ngOnDestroy(): void {
    this.subscriptionOnChanges.unsubscribe();
  }
}
