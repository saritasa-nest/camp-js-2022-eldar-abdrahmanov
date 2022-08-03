import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';

import { environment } from '../../environments/environment';

/** Anime service to interact with API. */
@Injectable({
  providedIn: 'root',
})

export class AnimeService {

  public constructor(private httpClient: HttpClient) {}

  /** Makes a request to the API and returns a list of anime. */
  public getAnimeList(): Observable<readonly Anime[]> {
    const params = new HttpParams()
      .set('ordering', 'id');
    return this.httpClient
      .get<PaginationDto<AnimeDto>>(environment.baseUrl, { params })
      .pipe(
        map(dto =>
          PaginationMapper.fromDto(dto, AnimeMapper.fromDto)),
        map(pagination => pagination.results),
      );
  }
}
