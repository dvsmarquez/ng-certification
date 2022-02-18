import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { LocationExistsGuard } from './guards/location-exists.guard';
import { ForecastResolver } from './resolvers/forecast.resolver';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'forecast/:zipCode',
    component: ForecastComponent,
    canActivate: [LocationExistsGuard],
    resolve: { forecast: ForecastResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForecastRoutingModule { }
