import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { Forecast } from '../models/forecast.model';
import { ForecastService } from '../services/forecast.service';

@Injectable({
  providedIn: 'root'
})
export class ForecastResolver implements Resolve<Forecast> {

  constructor(
    private forecastService: ForecastService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Forecast> {
    return this.forecastService.getForecast(route.params.zipCode)
      .pipe(
        catchError(error => {
          this.router.navigate(['/404']);

          throw error;
        })
      );
  }

}
