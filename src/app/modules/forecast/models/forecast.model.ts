import { getIconForWeather } from '../utils/icons';

export interface IForecast {
  city: { name: string };
  list: { dt: number, weather: { main: string }[], temp: { min: number, max: number } }[];
}

export class Forecast {

  city: string;

  list: {
    date: Date,
    description: string,
    minTemperature: number,
    maxTemperature: number,
    icon: string
  }[];

  constructor(iForecast: IForecast) {
    this.city = iForecast.city?.name;

    this.list = iForecast.list.map(day => ({
      date: new Date(day.dt * 1000), // Para convertir GMT a UTC
      description: day.weather[0]?.main,
      minTemperature: day.temp?.min,
      maxTemperature: day.temp?.max,
      icon: getIconForWeather(day.weather[0]?.main)
    }));
  }

}
