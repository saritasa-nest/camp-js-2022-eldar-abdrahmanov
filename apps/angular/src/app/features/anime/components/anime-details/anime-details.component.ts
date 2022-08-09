import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AnimeDetails } from '@js-camp/core/models/animeDetails';

import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { AnimeService } from '../../../../../core/services/anime.service';

/** */
@Component({
  selector: 'camp-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsComponent implements OnInit {
  /** */
  public animeDetails$!: Observable<AnimeDetails>;

  /** */
  private animeId = '';

  public constructor(
    private readonly animeService: AnimeService,
    private readonly route: ActivatedRoute,
  ) {}

  /** */
  public ngOnInit(): void {
    this.animeId = this.route.snapshot.paramMap.get('id') as string;
    this.animeDetails$ = this.animeService.getAnimeDetails(this.animeId);
    this.animeDetails$.subscribe(res => console.log(res))
  }
}
