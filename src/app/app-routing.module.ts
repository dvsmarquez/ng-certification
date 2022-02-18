import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/forecast/forecast.module').then(m => m.ForecastModule)
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }