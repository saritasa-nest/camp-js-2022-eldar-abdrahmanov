import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';

import { environment } from '../../environments/environment';
import { Pagination } from '@js-camp/core/models/pagination';

/** Anime service to interact with API. */
@Injectable({
  providedIn: 'root',
})

export class AnimeService {
  /** */
  public httpParams: HttpParams;

  public constructor(private httpClient: HttpClient) {
    this.httpParams = new HttpParams();
  }

  /** Makes a request to the API and returns a list of anime. */
  public getPaginationAndAnimeList(): Observable<Pagination<Anime>> {
    console.log(this.httpParams.toString())
    return this.httpClient
      .get<PaginationDto<AnimeDto>>(environment.baseUrl, { params: this.httpParams })
      .pipe(
        map(dto =>
          PaginationMapper.fromDto<AnimeDto, Anime>(dto, AnimeMapper.fromDto)),
      );
  }
}
