import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../domain/car';
import { CarService } from '../services/carservice';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export class PrimeCar implements Car {
  constructor(public vin?, public year?, public brand?, public color?) { }
}
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
  providers: [CarService, Location],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('1s')
      ]),
      transition(':leave', [
        animate('1s', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class DemoComponent implements OnInit {
  PathLocation: Location;

  displayDialog: boolean;

  car: Car = new PrimeCar();

  selectedCar: Car;

  newCar: boolean;

  cars: Car[];

  cols: any[];

  constructor(private carService: CarService, location: Location, public router: Router, private http:HttpClient) {
    this.PathLocation = location;
  }

  ngOnInit() {
    this.carService.getCarsSmall().then(cars => this.cars = cars);

    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
    ];
  }

  showDialogToAdd() {
    this.newCar = true;
    this.car = new PrimeCar();
    this.displayDialog = true;
  }

  save() {
    const cars = [...this.cars];
    if (this.newCar) {
      cars.push(this.car);
    } else {
      cars[this.findSelectedCarIndex()] = this.car;
    }
    this.cars = cars;
    this.car = null;
    this.displayDialog = false;
  }

  delete() {
    const index = this.findSelectedCarIndex();
    this.cars = this.cars.filter((val, i) => i !== index);
    this.car = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newCar = false;
    this.car = { ...event.data };
    this.displayDialog = true;
  }

  findSelectedCarIndex(): number {
    return this.cars.indexOf(this.selectedCar);
  }

  logout() {
    this.http.post('logout', {}).subscribe(() => {
      // this.app.authenticated = false;
      this.router.navigateByUrl('/login');
    });
  }
}
