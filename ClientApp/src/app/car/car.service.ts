import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICar } from './icar';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiURL: string = "";
  constructor(private http: HttpClient) { }

  getCars(): Observable<ICar[]> {
    this.apiURL = "https://localhost:7037/api/Cars";
    return this.http.get<ICar[]>(this.apiURL);
  }
  getCar(id: string): Observable<ICar> {
    this.apiURL = "https://localhost:7037/api/Cars";
    return this.http.get<ICar>(this.apiURL + '/' + id);
  }
  updateCar(car: ICar): Observable<ICar> {
    this.apiURL = "https://localhost:7037/api/Cars";
    return this.http.put<ICar>(this.apiURL + '/' + car.id.toString(), car);
  }
  createCar(car: ICar): Observable<ICar> {
    this.apiURL = "https://localhost:7037/api/Cars";
    return this.http.post<ICar>(this.apiURL, car);
  }
  deleteCar(id: string): Observable<ICar> {
    this.apiURL = "https://localhost:7037/api/Cars";
    return this.http.delete<ICar>(this.apiURL + '/' + id);
  }
}
