import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CsdService as DataService } from './csd.service';

@Component({
  selector: 'app-csd-query',
  templateUrl: './csd-query.component.html',
  styleUrls: ['./csd-query.component.css'],
  providers: [DatePipe, MessageService, DataService, ConfirmationService]
})
export class CsdQueryComponent implements OnInit {
  startDate: Date = new Date('2010/01/01');
  endDate: Date = new Date();

  sql: string;
  datas: any[];
  selectedItems: any[];
  disabled: boolean = true;
  waitDiv: boolean = false;
  loading: boolean = false;
  displayDialog: boolean = false;

  totalRecords: number;
  cols: any[] = [
    { field: 'id', header: 'ID' },
    { field: 'TIME_PERIOD', header: 'TIME_PERIOD' },
    { field: 'PLATFORM', header: 'PLATFORM' },
    { field: 'UNITS', header: 'UNITS' },
    { field: 'DOLLARS', header: 'DOLLARS' },
    { field: 'AVERAGE_PRICE', header: 'AVERAGE_PRICE' }
  ];

  salesData = {
    id: '',
    TIME_PERIOD: '',
    PLATFORM: '',
    UNITS: '',
    DOLLARS: '',
    AVERAGE_PRICE: ''
  };

  constructor(private datePipe: DatePipe, private messageService: MessageService, private dataService: DataService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
  }

  getFormatedDate(date: Date) {
    return this.datePipe.transform(date, "yyyy-MM-dd");
  }

  preview() {
    if (this.startDate == null || this.endDate == null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select a date!' });
      return;
    }

    this.waitDiv = true;
    this.loading = true;
    this.dataService.preview(this.getFormatedDate(this.startDate), this.getFormatedDate(this.endDate)).subscribe(
      (d: any) => {
        this.datas = d;
        // this.totalRecords = d.total;
        this.datas.forEach(t => {
          t.TIME_PERIOD = this.datePipe.transform(t.TIME_PERIOD, "yyyy-MM-dd");
        });
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

  deleteConfirm() {
    this.confirmationService.confirm({
      message: `Are you sure to delete these ${this.selectedItems.length} items ?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.delete(this.selectedItems).subscribe((d: any) => {
          this.messageService.add({ severity: 'success', summary: 'Service Message', detail: d });
          this.selectedItems = [];
          this.preview();
        },
          (err: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err });
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected.' });
      }
    });
  }

  selectRowWithButton(item: any) {
    this.salesData = item;
    this.displayDialog = true;
  }

  save() {
    this.dataService.update(this.salesData).subscribe(
      (d: any) => {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: d });
      },
      (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err });
      },
      () => {
        this.displayDialog = false;
        this.preview();
      }
    );
  }
}