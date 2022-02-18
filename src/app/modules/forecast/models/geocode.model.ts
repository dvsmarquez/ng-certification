export interface IGeocode {
  zip: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
}

export class Geocode {

  zipCode: string;

  name: string;

  latitude: number;

  longitude: number;

  country: string;

  constructor(iGeocode: IGeocode) {
    this.zipCode = iGeocode.zip;
    this.name = iGeocode.name;
    this.latitude = iGeocode.lat;
    this.longitude = iGeocode.lon;
    this.country = iGeocode.country;
  }

}
