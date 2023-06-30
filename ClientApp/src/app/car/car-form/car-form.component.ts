import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../car.service';
import { ICar } from '../icar';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private carServices: CarService, private router: Router, private activatedRoute: ActivatedRoute) { }

  formGroup!: FormGroup;
  modoEdicion: boolean = false;
  carId!: number;

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: null,
      make: '',
      model: ''
    });
    this.activatedRoute.params.subscribe(params => {
      if (params["id"] == undefined) {
        return;
      }
      this.modoEdicion = true;
      this.carId = params["id"];

      this.carServices.getCar(this.carId.toString())
        .subscribe((car) => this.cargarForm(car), () => this.router.navigate(["/car"]));
    });
  }

  cargarForm(car: ICar) {
    this.formGroup.patchValue({
      id: car.id,
      make: car.make,
      model: car.model,
    });
  }

  get f() {
    return this.formGroup.controls;
  }

  save() {
    let car: ICar = Object.assign({}, this.formGroup.value);

    if (this.modoEdicion) {
      //edit
      car.id = this.carId;
      this.carServices.updateCar(car)
        .subscribe(() => this.onSaveSuccess(), () => this.router.navigate(["/car"]));
    }
    else {
      //add
      this.carServices.createCar(car)
        .subscribe(() => this.onSaveSuccess(), error => console.error(error), () => this.router.navigate(["/car"]));
    }
  }

  onSaveSuccess() {
    this.router.navigate(["/car"]);
  }
}
