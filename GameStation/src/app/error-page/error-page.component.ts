import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  template: `<img src='assets/404-error-image.png' height="800" width="1280"/>`
})
export class ErrorPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
