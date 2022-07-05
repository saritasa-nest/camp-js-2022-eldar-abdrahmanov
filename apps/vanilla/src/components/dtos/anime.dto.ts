export interface AnimeDto {
  /** Id*/
  readonly id: number;

  /** Image*/
  readonly image: string;

  /** TitleEng*/
  readonly title_eng: string;

  /** TitleJpn*/
  readonly title_jpn: string;

  /** Type*/
  readonly type: string;

  /** Status*/
  readonly status: string;

  /** AiredStart*/
  readonly airedStart: string;
}
