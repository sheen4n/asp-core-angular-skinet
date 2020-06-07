import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss'],
})
export class PagerComponent implements OnInit {
  @Input() totalCount: number;
  @Input() pageSize: number;
  @Output() pageChanged = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  onPagerChange(event: PageChangedEvent) {
    this.pageChanged.emit(event.page);
  }
}
