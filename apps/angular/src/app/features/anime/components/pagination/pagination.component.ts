import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

/** Pagination component. */
@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  /** Pagination length. */
  public length: number;

  /** Items on page. */
  public pageSize: number;

  /** Index of active page. */
  public pageIndex: number;

  /** List of options items on page. */
  public readonly pageSizeOptions: readonly number[];

  /** Option to show first and last button. */
  public showFirstLastButtons: boolean;

  /** Pagination event emitter. */
  @Output() public readonly paginationEventEmitter = new EventEmitter();

  /** Angular material Pagination. */
  @ViewChild('paginator') private readonly paginator!: MatPaginator;

  public constructor() {
    this.length = 0;
    this.pageSize = 25;
    this.pageIndex = 0;
    this.pageSizeOptions = [5, 10, 25, 100];
    this.showFirstLastButtons = true;
  }

  /** Reset pagination to the first page. */
  public resetToFirstPage(): void {
    this.paginator.firstPage();
  }

  /**
   * Set pagination length.
   * @param totalCount Total count of items.
   */
  public setLength(totalCount: number): void {
    this.paginator.length = totalCount;
  }

  /**
   * Emits actions with pagination.
   * @param event Angular Material Page event.
   */
  public handlePageEvent(event: PageEvent): void {
    this.paginationEventEmitter.emit(event);
  }
}
