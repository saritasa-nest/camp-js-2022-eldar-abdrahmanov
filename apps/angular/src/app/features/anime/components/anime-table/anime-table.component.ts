import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';

import { Anime } from '@js-camp/core/models/anime';
import { Observable } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PaginationComponent } from '../pagination/pagination.component';
import { AnimeService } from '../../../../../core/services/anime.service';

/** Anime table component. */
@Component({
  selector: 'anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AnimeTableComponent implements OnInit {

  /** Titles of table columns. */
  public readonly displayedColumns = [
    'image',
    'titleEng',
    'titleJpn',
    'airedStart',
    'type',
    'status',
  ];

  public dataSource!: MatTableDataSource<Anime>;

  /** Anime list. */
  public animeList!: Anime[];
  public animeList$!: Observable<Anime[]>;
  public totalCountAnime!: number;

  handlePaginationClick(event: PageEvent): void {
    console.log(event);
    this.animeService.setOffsetParam((event.pageIndex) * event.pageSize);
    this.getAnimeList();
  }

  @ViewChild(MatSort) sort!: MatSort;

  public constructor(private animeService: AnimeService) {
  }

  private getAnimeList() {
    this.animeService.getPaginationAndAnimeList().subscribe(response => {
      this.animeList = response.results;
      this.totalCountAnime = response.count;
    })
  }

  /*ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }*/

  ngOnInit() {
    this.getAnimeList();
  }
}
