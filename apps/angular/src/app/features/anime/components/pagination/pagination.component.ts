import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
  public length!: number;
  @Output() paginationEventEmitter = new EventEmitter();
  public pageSize = 25;
  public pageIndex = 0;
  public pageSizeOptions = [5, 10, 25, 100];
  public showFirstLastButtons = true;

  @ViewChild('paginator') paginator!: MatPaginator;
  constructor() {
  }

  /** */
  public resetToFirstPage(): void {
    this.paginator.firstPage();
  }

  /**
   * @param
   * */
  public setLength(totalCount: number): void {
    this.paginator.length = totalCount;
  }

  ngOnInit(): void {

  }

  /**
   * @param event
   */
  public handlePageEvent(event: PageEvent): void {
    this.paginationEventEmitter.emit(event);
  }
}
