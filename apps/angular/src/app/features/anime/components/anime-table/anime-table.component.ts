import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Anime } from '@js-camp/core/models/anime';
import { Observable } from 'rxjs';

import { AnimeService } from '../../../../../core/services/anime.service';

/** Anime table component. */
@Component({
  selector: 'anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
})

export class AnimeTableComponent implements OnInit{

  /** Titles of table columns. */
  public displayedColumns: string[] = [
    'image',
    'titleEng',
    'titleJpn',
    'airedStart',
    'type',
    'status',
  ];

  //public animeList: Anime[];

  /** Anime list. */
  //public animeList$: Observable<Anime[]>;

  public dataSource!: MatTableDataSource<Anime>;

  public constructor(private animeService: AnimeService) {
    //this.animeList$ = animeService.getAnimeList();
  }

  getAnime(): void {
    this.animeService.getAnimeList().subscribe(res => {
      console.log(res)
      // @ts-ignore
      this.dataSource = new MatTableDataSource(res);
    })
  }

  ngOnInit() {
    this.getAnime() }
}
