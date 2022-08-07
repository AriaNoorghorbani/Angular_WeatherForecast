import { Component, OnInit } from '@angular/core';
import { ForecastService } from 'src/app/_services/forecast.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  constructor(private forecastservice: ForecastService) { }
  
  ngOnInit(): void {
    this.forecastservice.getForecast().subscribe((data:any) => {
      console.log(data)
    })
  }

}
