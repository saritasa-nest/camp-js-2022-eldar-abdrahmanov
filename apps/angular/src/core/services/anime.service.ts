import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';

import { Pagination } from '@js-camp/core/models/pagination';

import { AppConfigService } from './appConfigService';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  public constructor(
    private readonly httpClient: HttpClient,
    private readonly appConfig: AppConfigService,
  ) {}

  /**
   * Get pagination with anime list.
   * @param httpParams Request parameters.
   */
  public getPaginationAndAnimeList(httpParams: HttpParams): Observable<Pagination<Anime>> {
    return this.httpClient
      .get<PaginationDto<AnimeDto>>(this.appConfig.baseUrl, {
      params: httpParams,
    })
      .pipe(map(dto => PaginationMapper.fromDto(dto, AnimeMapper.fromDto)));
  }
}
