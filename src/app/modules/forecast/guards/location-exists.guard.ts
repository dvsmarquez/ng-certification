import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ForecastService } from '../services/forecast.service';

@Injectable({
  providedIn: 'root'
})
export class LocationExistsGuard implements CanActivate {

  constructor(
    private forecastService: ForecastService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.forecastService.getLocations()
      .pipe(
        map(locations => {
          const found = locations.find(l => l === route.params.zipCode);

          return found !== undefined || this.router.createUrlTree(['/404']);
        })
      );
  }

}
