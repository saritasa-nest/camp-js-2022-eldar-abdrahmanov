import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
  @Input() public length!: number;
  @Output() paginationEventEmitter = new EventEmitter();
  public pageSize = 25;
  public pageIndex = 0;
  public pageSizeOptions = [25];
  public showFirstLastButtons = true;
  constructor() {
  }

  ngOnInit(): void {}

  /** */
  public handlePageEvent(event: PageEvent): void {
    this.paginationEventEmitter.emit(event);
  }
}
