import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  getForecast(){
    return this.getCurrentLocation().pipe(
      map((coords: any) => {
        return new HttpParams()
        .set('appid', '6cc2c74dedcccc8135d6a0d73223f0fa')
        .set('units', 'metric')
        .set('lon', coords.longitude.toString())
        .set('lat', coords.latitude.toString());
      })
    )
  }

  getCurrentLocation() {
    return new Observable((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err)
      );
    });
}
  constructor() { }


  // window.navigator.geolocation.getCurrentPosition(
  //   (position) => {
  //     console.log(position)
  //   },
  //   (error) => {
  //     console.log(error)
  //   }
  // );
}
