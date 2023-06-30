import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from './car.service';
import { ICar } from './icar';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  public cars: ICar[] = [];

  constructor(private carServices: CarService, private router: Router) { }

  ngOnInit(): void {
    this.carServices.getCars().subscribe(cars => this.cars = cars, error => console.error(error));
  }

  cargarDatos() {
    this.carServices.getCars()
      .subscribe(cars => this.cars = cars,
        () => this.router.navigate(["/cars"]))
  }

  delete(car: ICar) {
    this.carServices.deleteCar(car.id.toString())
      .subscribe(() => this.cargarDatos(), () => this.router.navigate(["/cars"]));
  }
}
