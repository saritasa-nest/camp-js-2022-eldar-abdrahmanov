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
  public length = 0;

  /** Items on page. */
  public pageSize = 25;

  /** Index of active page. */
  public pageIndex = 0;

  /** List of options items on page. */
  public readonly pageSizeOptions = [5, 10, 25, 100];

  /** Option to show first and last button. */
  public showFirstLastButtons = true;

  /** Pagination event emitter. */
  @Output() public readonly paginationChange = new EventEmitter();

  /** Angular material Pagination. */
  @ViewChild('paginator') private readonly paginator!: MatPaginator;

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
    this.paginationChange.emit(event);
  }
}
