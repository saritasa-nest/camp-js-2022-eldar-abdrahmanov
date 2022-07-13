import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import {
  SORT_BY_TITLE_ENG_URL,
  SORT_BY_STATUS_URL,
  SORT_BY_ID_URL,
  SORT_BY_AIRED_START_URL,
  BASE_URL,
} from './constants/constants';
import { AnimeTypeEnum } from "@js-camp/core/unions/animeType";

/** Send request.
 * @param url Link. */
export async function getPagination(url: string): Promise<Pagination> {
  try {
    let res = await fetch(url);
    let data = await res.json();
    return PaginationMapper.fromDto(data);
  }
  catch (err: any) {
    throw new Error(err.message)
  }
}

export function getAnimeById(): Promise<Pagination> {
  return getPagination(SORT_BY_ID_URL);
}

export function getAnimeByTitleEng() {
  return getPagination(SORT_BY_TITLE_ENG_URL);
}

export function getAnimeByStatus() {
  return getPagination(SORT_BY_STATUS_URL);
}

export function getAnimeByAiredStart() {
  return getPagination(SORT_BY_AIRED_START_URL);
}

export function getAnimeByOffset(
  paginationIndex: number,
  limitAnimeOnPage: number,
  selector: string
): Promise<Pagination> {
  const offset = paginationIndex * limitAnimeOnPage;
  let url = '';
console.log(selector)
  if (selector in AnimeTypeEnum) {
    url = `${BASE_URL}?offset=${offset}&type=${selector}`;
  } else {
    url = `${BASE_URL}?offset=${offset}&ordering=${selector}`;
  }
  return getPagination(url);
}

/*
export function getAnimeByOffsetAndOrdering(
  paginationIndex: number,
  limitAnimeOnPage: number,
  ordering: string)
{
  const offset = paginationIndex * limitAnimeOnPage;
  const url = `${BASE_URL}?offset=${offset}&ordering=${ordering}`
  return getPagination(url)
}

export function getAnimeByOffsetAndType(
  paginationIndex: number,
  limitAnimeOnPage: number,
  animeType: string): Promise<Pagination>
{
  const offset = paginationIndex * limitAnimeOnPage;
  const url = `${BASE_URL}?offset=${offset}&type=${animeType}`
  return getPagination(url)
}*/
