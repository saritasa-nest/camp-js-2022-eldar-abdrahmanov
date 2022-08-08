import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AnimeType } from '@js-camp/core/enums/animeType';
import { MatSelectChange } from '@angular/material/select';

/** Filtering component. */
@Component({
  selector: 'filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilteringComponent {
  /** Filtering event emitter. */
  @Output() private readonly filterChange = new EventEmitter();

  /** FormControl instance. */
  public readonly animeTypes = new FormControl();

  /** List of anime types. */
  public readonly animeTypeList = Object.values(AnimeType);

  /**
   * Emit event when changes filtering selection.
   * @param event Event that generates angular material Select.
   */
  public handleChangeSelection(event: MatSelectChange): void {
    this.filterChange.emit(event);
  }

  /**
   * Sets the active buttons that the user has selected when loading the page.
   * @param animeTypes List of anime types values.
   */
  public setSelectedAnimeTypes(animeTypes: readonly string[]): void {
    this.animeTypes.setValue(animeTypes);
  }
}
