import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WeatherComponent } from './components/weather/weather.component';
import { ForecastRoutingModule } from './forecast-routing.module';
import { ForecastComponent } from './components/forecast/forecast.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AddLocationComponent,
    WeatherComponent,
    ForecastComponent
  ],
  imports: [
    SharedModule,
    ForecastRoutingModule
  ]
})
export class ForecastModule { }
