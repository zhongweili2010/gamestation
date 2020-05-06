import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService, Message, ConfirmationService } from 'primeng/api';
import { HypDashboardService } from './hyp-dashboard.service';
import { saveAs } from 'file-saver';
import { ActivatedRoute } from '@angular/router';

interface HypData {
  txPeriod: string,
  srcFile: string,
  step1?: string,
  step2?: string,
  step3?: string,
  step4?: string,
  createdBy: string,
  created: string,
  modified: string
}

@Component({
  selector: 'app-hyp-dashboard',
  templateUrl: './hyp-dashboard.component.html',
  styleUrls: ['./hyp-dashboard.component.css'],
  providers: [MessageService, HypDashboardService, ConfirmationService]
})
export class HypDashboardComponent implements OnInit {

  cols: any[] = [
    { field: 'txPeriod', header: 'tx_period' },
    { field: 'srcFile', header: 'src_file' },
    { field: 'step1', header: 'step1' },
    { field: 'step2', header: 'step2' },
    { field: 'step3', header: 'step3' },
    { field: 'step4', header: 'step4' },
    { field: 'createdBy', header: 'created_by' },
    { field: 'created', header: 'created' },
    { field: 'modified', header: 'modified' }
  ];

  user: string;

  datas: HypData[];
  loading: boolean = false;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private messageService: MessageService, private hypDashboardService: HypDashboardService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.user = this.route.snapshot.paramMap.get('user');
    this.listAll();
  }

  listAll() {
    this.loading = true;
    this.hypDashboardService.listAll().subscribe((data: any) => {
      this.datas = data;
    },
      (err: any) => {
        this.showError(err);
      },
      () => {
        this.loading = false;
      });
  }

  showError(detail) {
    this.messageService.clear();
    this.messageService.add({ severity: 'error', summary: 'Error Message', detail: detail });
  }

  onDownload(src: string) {
    this.loading = true;
    this.hypDashboardService.downloadCsv(src).subscribe(
      data => saveAs(data, src + '.xls'),
      error => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
      },
      () => {
        this.loading = false;
      }
    );
  }

  deleteConfirm(src: string) {
    this.confirmationService.confirm({
      message: `Are you sure to delete "${src}" ?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.hypDashboardService.delete(src).subscribe(
          (value: Object) => {
            this.listAll();
          },
          (error: any) => {
            console.info(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          },
          () => {
          }
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected.' });
      }
    });
  }

  myUploader(event) {
    let filename = event.files[0].name;
    let imported = false;
    this.datas.forEach(e => {
      if (e.srcFile == filename) {
        imported = true;
        return;
      }
    });
    if (imported) {
      this.confirmationService.confirm({
        message: "The program will delete old data and insert new data. Are you sure?",
        header: 'The file has been imported before.',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.doUpload(event.files[0]);
        },
        reject: () => {
          this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected.' });
        }
      });
    } else {
      this.doUpload(event.files[0]);
    }
  }

  doUpload(file) {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("user", this.user);
    this.hypDashboardService.fileUpload(formData).subscribe(d => {
      this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: 'Done' });
      this.listAll();
    },
      (error: any) => {
        console.info(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
      },
      () => {
      }
    );
  }
}
