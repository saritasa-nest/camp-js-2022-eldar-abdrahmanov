import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimeType } from '@js-camp/core/enums/animeType';
import { AnimeStatus } from '@js-camp/core/enums/statusType';
import { AnimeSource } from '@js-camp/core/enums/animeSource';
import { AnimeRating } from '@js-camp/core/enums/animeRating';
import { AnimeSeason } from '@js-camp/core/enums/animeSeason';
import { Studio } from '@js-camp/core/models/studio';
import { Observable } from 'rxjs';

/** */
@Component({
  selector: 'edit-page',
  templateUrl: './anime-edit.component.html',
  styleUrls: ['./anime-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeEditComponent {

  /** Anime edit form. */
  public readonly form: FormGroup;

  /** Anime types. */
  public readonly animeTypes = AnimeType;

  /** Anime status. */
  public readonly animeStatus = AnimeStatus;

  /** Anime source. */
  public readonly animeSource = AnimeSource;

  /** Anime rating. */
  public readonly animeRating = AnimeRating;

  /** Anime seasons. */
  public readonly animeSeason = AnimeSeason;

  /** Anime Studios. */
  public animeStudios = Observable<Studio>;

  public constructor(
    private readonly formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group(
      {
        titleEng: [''],
        titleJpn: [''],
        imageUrl: [''],
        youTubeId: [''],
        type: ['', Validators.required],
        status: ['', Validators.required],
        source: ['', Validators.required],
        airing: ['', Validators.required],
        airedStart: ['', Validators.required],
        airedEnd: ['', Validators.required],
        rating: ['', Validators.required],
        season: ['', Validators.required],
        synopsis: ['', Validators.required],
        background: [''],
        studios: ['', Validators.required],
        genres: ['', Validators.required],
      },
    );
  }
}
