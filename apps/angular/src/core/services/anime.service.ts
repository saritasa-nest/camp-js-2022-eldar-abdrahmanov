import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';

import { Pagination } from '@js-camp/core/models/pagination';

import { AnimeDetailsMapper } from '@js-camp/core/mappers/animeDetails.mapper';
import { DateTimeRangeMapper } from '@js-camp/core/mappers/dateTimeRange.mapper';
import { StudioMapper } from '@js-camp/core/mappers/studio.mapper';
import { GenreMapper } from '@js-camp/core/mappers/genre.mapper';
import { AnimeDetailsDto } from '@js-camp/core/dtos/animeDetails.dto';
import { AnimeDetails } from '@js-camp/core/models/animeDetails';

import { AppConfigService } from './appConfig.service';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  private readonly animeUrl = new URL('anime/anime/', this.appConfig.apiUrl);

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
      .get<PaginationDto<AnimeDto>>(this.animeUrl.toString(), {
      params: httpParams,
    })
      .pipe(map(dto => PaginationMapper.fromDto(dto, AnimeMapper.fromDto)));
  }

  /**
   * Get details of anime.
   * @param animeId Id of anime.
   */
  public getAnimeDetails(animeId: string): Observable<AnimeDetails> {
    const animeDetailsUrl = new URL(`${animeId}/`, this.animeUrl);
    return this.httpClient
      .get<AnimeDetailsDto>(animeDetailsUrl.toString())
      .pipe(
        map(dto =>
          AnimeDetailsMapper.fromDto(
            dto,
            DateTimeRangeMapper.fromDto,
            StudioMapper.fromDto,
            GenreMapper.fromDto,
          )),
      );
  }
}
