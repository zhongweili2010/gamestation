import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../domain/car';
import { map } from 'rxjs/operators';

@Injectable()
export class CarService {

    constructor(private http: HttpClient) { }

    getCarsSmall() {
        return this.http.get<any>('assets/data/cars-small.json')
            .toPromise()
            .then(res => <Car[]>res.data)
            .then(data => data);
    }

    getCarsMedium() {
        return this.http.get<any>('assets/data/cars-medium.json')
            .toPromise()
            .then(res => <Car[]>res.data)
            .then(data => { return data; });
    }

    getCarsLarge() {
        return this.http.get<any>('assets/data/cars-large.json')
            .toPromise()
            .then(res => <Car[]>res.data)
            .then(data => { return data; });
    }

    getCarsHuge() {
        return this.http.get<any>('assets/showcase/data/cars-huge.json')
            .toPromise()
            .then(res => <Car[]>res.data)
            .then(data => { return data; });
    }
}
