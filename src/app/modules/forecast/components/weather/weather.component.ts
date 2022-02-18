import { Component, OnInit } from '@angular/core';
import { ERRORS } from '../../../shared/models/generics.model';
import { Weather } from '../../models/weather.model';
import { ForecastService } from '../../services/forecast.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weather: Weather[];

  error: ERRORS;

  readonly ERRORS_TYPE = ERRORS;

  constructor(private forecastService: ForecastService) { }

  ngOnInit(): void {
    this.setWeather();
  }

  delete(zipCode: string): void {
    this.forecastService.deleteLocation(zipCode).subscribe();
  }

  private async setWeather(): Promise<void> {
    try {
      this.weather = await this.forecastService.weather;
    } catch {
      this.error = ERRORS.SERVICE_UNAVAILABLE;
    }    
  }

}
