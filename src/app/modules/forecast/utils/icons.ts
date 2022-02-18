export function getIconForWeather(weather: string): string {
  let icon: string;

  switch (weather) {
    case 'Thunderstorm':
    case 'Mist':
    case 'Smoke':
    case 'Haze':
    case 'Dust':
    case 'Fog':
    case 'Sand':
    case 'Dust':
    case 'Ash':
    case 'Squall':
    case 'Tornado':
    case 'Clouds':
      icon = 'clouds.png';
      break;
    case 'Drizzle':
    case 'Rain':
      icon = 'rain.png';
      break;
    case 'Snow':
      icon = 'snow.png';
      break;
    case 'Clear':
      icon = 'sun.png';
      break;
  }

  return icon;
}
