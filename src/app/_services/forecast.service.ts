import { Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { filter, map, mergeMap, pluck, switchMap } from "rxjs/operators";
import { HttpClient, HttpParams } from "@angular/common/http";

interface responseweather {
  list: {
    dt_txt: string;
    main: {
      temp: number
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private url: string = 'https://api.openweathermap.org/data/2.5/forecast';
  constructor(private http: HttpClient) { }

  getForecast() {
    return this.getCurrentLocation().pipe(
      map((coords: any) => {
        return new HttpParams()
          .set('appid', '243fb7258116a8b7a82dd55daacfea44')
          .set('units', 'metric')
          .set('lon', coords.longitude.toString())
          .set('lat', coords.latitude.toString());
      }),
      switchMap((params) =>
        this.http.get<responseweather[]>(this.url, { params })
      ),
      pluck('list')
    ).pipe(mergeMap((value: any) => of(...value)),
    filter((value, index) => index % 8 === 0))
  }
  

  getCurrentLocation() {
    return new Observable((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err)
      )
    });
}

  // window.navigator.geolocation.getCurrentPosition(
  //   (position) => {
  //     console.log(position)
  //   },
  //   (error) => {
  //     console.log(error)
  //   }
  // );
}