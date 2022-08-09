import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

/** */
@Component({
  selector: 'camp-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
