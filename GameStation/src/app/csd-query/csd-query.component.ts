import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { CsdService as DataService } from './csd.service';
import { Observable, of } from 'rxjs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-csd-query',
  templateUrl: './csd-query.component.html',
  styleUrls: ['./csd-query.component.css'],
  providers: [DatePipe, MessageService, DataService]
})
export class CsdQueryComponent implements OnInit {
  startDate: Date = new Date('2010/01/01');
  endDate: Date = new Date();

  sql: string;
  datas: any[];

  disabled: boolean = true;
  waitDiv: boolean = false;
  loading: boolean = false;

  totalRecords: number;
  cols: any[] = [
    { field: 'TIME_PERIOD', header: 'TIME_PERIOD' },
    { field: 'UNITS', header: 'UNITS' },
    { field: 'PLATFORM', header: 'PLATFORM' },
    { field: 'DOLLARS', header: 'DOLLARS' },
    { field: 'AVERAGE_PRICE', header: 'AVERAGE_PRICE' }
  ];

  constructor(private datePipe: DatePipe, private messageService: MessageService, private dataService: DataService) { }

  ngOnInit() {
  }

  getFormatedDate(date: Date) {
    return this.datePipe.transform(date, "MM-dd-yyyy");
  }

  onLazyLoad(event: LazyLoadEvent) {
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    if (this.disabled)
      return;
    this.loading = true;
    this.dataService.lazyLoad(this.sql, JSON.stringify(event)).subscribe(
      (d: any) => {
        this.totalRecords = d.total;
        this.datas = d.data;
        this.datas.forEach(d => {
          d.TX_PERIOD = this.datePipe.transform(d.TX_PERIOD, "M-y");
        });
      },
      (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err });
      },
      () => {
        this.loading = false;
      }
    );

  }

  preview() {
    if (this.startDate == null || this.endDate == null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select a date!' });
      return;
    }
    // let event: LazyLoadEvent = {
    //   first: 0,
    //   rows: 10,
    //   sortOrder: 1,
    //   filters: {},
    //   globalFilter: null,
    // };

    this.waitDiv = true;
    this.loading = true;
    this.dataService.preview(this.getFormatedDate(this.startDate), this.getFormatedDate(this.endDate)).subscribe(
      (d: any) => {
        this.datas = d;
        // this.totalRecords = d.total;
        // this.datas.forEach(d => {
        //   d.TX_PERIOD = this.datePipe.transform(d.TX_PERIOD, "MM-dd-yyyy");
        // });
      },
      (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err });
      },
      () => {
        this.waitDiv = false;
        this.loading = false;
        this.disabled = false;
      }
    );
  }
}