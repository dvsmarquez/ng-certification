import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Forecast } from '../../models/forecast.model';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  forecast: Forecast;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.forecast = this.route.snapshot.data.forecast;
  }

}
