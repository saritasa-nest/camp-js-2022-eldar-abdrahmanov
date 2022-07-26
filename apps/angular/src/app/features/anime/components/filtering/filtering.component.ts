import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { AnimeType } from "@js-camp/core/enums/animeType";

@Component({
  selector: 'filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortingComponent implements OnInit {
  animeTypes = new FormControl('');
  animeTypeList = Object.values(AnimeType);

  constructor() {}


  ngOnInit(): void {}
}
