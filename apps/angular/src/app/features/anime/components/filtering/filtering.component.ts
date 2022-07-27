import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from "@angular/forms";
import { AnimeType } from "@js-camp/core/enums/animeType";
import { MatSelectChange } from '@angular/material/select';

/** */
@Component({
  selector: 'filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortingComponent implements OnInit {

  /** */
  @Output() filteringEventEmitter = new EventEmitter();

  /** */
  public readonly animeTypes = new FormControl('');

  /** */
  public readonly animeTypeList = Object.values(AnimeType);

  /** */
  public handleChangeSelection(event: MatSelectChange): void {
    this.filteringEventEmitter.emit(event);
  }

  ngOnInit(): void {}
}
