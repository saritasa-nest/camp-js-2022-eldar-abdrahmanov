import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AnimeService } from '../../../../../core/services/anime.service';

/** */
@Component({
  selector: 'camp-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent {
  public constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      animeTitle: string;
      id: number;
    },
    public dialogRef: MatDialogRef<PopupComponent>,
    private readonly animeService: AnimeService,
  ) {}

  /** Ok button click handler. */
  public onOkClick(): void {
    this.animeService.deleteAnime(this.data.id).subscribe();
  }
}
