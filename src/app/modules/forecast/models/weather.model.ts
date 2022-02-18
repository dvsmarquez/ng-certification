import { getIconForWeather } from '../utils/icons';

export interface IWeather {
  name: string;
  weather: { main: string }[];
  main: { temp: number, temp_min: number, temp_max: number };
}

export class Weather {

  name: string;

  description: string;

  temperature: number;

  minTemperature: number;

  maxTemperature: number;

  icon: string;

  constructor(iWeather: IWeather, public zipCode: string) {
    this.name = iWeather.name;
    this.description = iWeather.weather[0]?.main;
    this.temperature = iWeather.main?.temp;
    this.minTemperature = iWeather.main?.temp_min;
    this.maxTemperature = iWeather.main?.temp_max;
    this.icon = getIconForWeather(this.description);
  }

}
