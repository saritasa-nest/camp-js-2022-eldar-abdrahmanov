import { AnimeType } from '../AnimeType';

export interface AnimeListDto {
  id: number;
  created: string;
  modified: string;
  titleEng: string;
  titleJpn: string;
  image: string;
  airedStart: Date;
  airedEnd: Date;
  type: AnimeType
  status: string;
}
