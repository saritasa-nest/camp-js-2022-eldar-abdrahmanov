import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';

import { AppConfigService } from './appConfig.service';

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
   * Get anime list.
   * @returns Observable anime list.
   */
  public getAnimeList(): Observable<Anime[]> {
    const animeUrl = new URL('anime/anime/', this.appConfig.apiUrl);
    const params = new HttpParams().set('ordering', 'id');
    return this.httpClient
      .get<PaginationDto<AnimeDto>>(animeUrl.toString(), { params })
      .pipe(
        map(dto => PaginationMapper.fromDto(dto, AnimeMapper.fromDto)),
        map(pagination => pagination.results),
      );
  }
}
