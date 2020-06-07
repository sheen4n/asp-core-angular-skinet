import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paging-header',
  templateUrl: './paging-header.component.html',
  styleUrls: ['./paging-header.component.scss'],
})
export class PagingHeaderComponent implements OnInit {
  @Input() pageNumber: number;
  @Input() pageSize: number;
  @Input() totalCount: number;

  get hasResults(): boolean {
    return this.totalCount && this.totalCount > 0;
  }

  math = Math;

  constructor() {}

  ngOnInit(): void {}
}
