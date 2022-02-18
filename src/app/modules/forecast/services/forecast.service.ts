import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, from, lastValueFrom, map, mergeMap, Observable, of, tap, toArray } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../../shared/services/storage.service';
import { Forecast, IForecast } from '../models/forecast.model';
import { Geocode, IGeocode } from '../models/geocode.model';
import { IWeather, Weather } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  get weather(): Promise<Weather[]> {
    return new Promise<Weather[]>(async (resolve, reject) => {
      if (this._weather.length) {
        return resolve(this._weather);
      }

      try {
        await lastValueFrom(this.getLocationsWeather());
      } catch (e) {
        return reject(e);
      }

      return resolve(this._weather);
    });
  }

  private _weather: Weather[];

  private readonly WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  private readonly GEOCODING_API_URL = 'https://api.openweathermap.org/geo/1.0/zip';

  private readonly FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast/daily';

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this._weather = [];
  }

  saveLocation(zipCode: string): Observable<string[]> {
    zipCode = zipCode.trim();

    return this.getLocations()
      .pipe(
        map(locations => {
          const found = locations.find(l => l === zipCode);

          return { locations, location: found ? undefined : zipCode };
        }),
        concatMap(({ locations, location }) => {
          if (!location) {
            return of([] as string[]);
          }

          return this.getWeather(location).pipe(
            concatMap(() => {
              locations.unshift(location);

              return this.setLocations(locations);
            }),
            map(({ result, locations }) => result ? locations : [] as string[])
          );
        })
      );
  }

  deleteLocation(zipCode: string): Observable<string[]> {
    return this.getLocations().pipe(
      map(locations => {
        const index = locations.findIndex(l => l === zipCode);
        locations.splice(index, index > -1 ? 1 : 0);

        return locations;
      }),
      concatMap(locations => this.setLocations(locations)),
      tap(() => {
        const index = this._weather.findIndex(w => w.zipCode === zipCode);
        this._weather.splice(index, index > -1 ? 1 : 0);
      }),
      map(r => r.locations)
    );
  }

  getForecast(zipCode: string): Observable<Forecast> {
    const requestForecast = (geocode: Geocode): Observable<Forecast> => {
      const params = this.getUrlParams({
        lat: geocode.latitude,
        lon: geocode.longitude,
        units: 'imperial',
        cnt: 5
      });

      return this.http.get<IForecast>(this.FORECAST_API_URL, { params })
        .pipe(map(iForecast => new Forecast(iForecast)));
    };

    return this.geocode(zipCode)
      .pipe(
        concatMap(geocode => requestForecast(geocode))
      );
  }

  getLocations(): Observable<string[]> {
    return this.storageService.get('locations')
      .pipe(map(locations => locations || []));
  }

  private getLocationsWeather(): Observable<Weather[]> {
    return this.getLocations()
      .pipe(
        concatMap(locations => from(locations).pipe(mergeMap(l => this.getWeather(l)))),
        toArray()
      );
  }

  private setLocations(locations: string[]): Observable<{ result: boolean, locations: string[] }> {
    return this.storageService.set('locations', locations)
      .pipe(map(result => ({ result, locations })));
  }

  private getWeather(zipCode: string): Observable<Weather> {
    const requestWeather = (geocode: Geocode): Observable<{ iWeather: IWeather, geocode: Geocode }> => {
      const params = this.getUrlParams({
        lat: geocode.latitude,
        lon: geocode.longitude,
        units: 'imperial'
      });

      return this.http.get<IWeather>(this.WEATHER_API_URL, { params })
        .pipe(map(iWeather => ({ iWeather, geocode })));
    };

    return this.geocode(zipCode)
      .pipe(
        concatMap(geocode => requestWeather(geocode)),
        map(r => new Weather(r.iWeather, r.geocode.zipCode)),
        tap(w => this._weather.unshift(w))
      );
  }

  private geocode(zipCode: string): Observable<Geocode> {
    const params = this.getUrlParams({ zip: zipCode });

    return this.http.get<IGeocode>(this.GEOCODING_API_URL, { params })
      .pipe(map(iGeocode => new Geocode(iGeocode)));
  }

  private getUrlParams(params?: { [key: string]: string | number }): HttpParams {
    const _params = params || {};
    _params.appid = environment.openWeatherAPIKey;
    const httpParams = new HttpParams({ fromObject: _params });

    return httpParams;
  }

}
