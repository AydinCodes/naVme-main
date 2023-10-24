// export interface CustomerMapDetails {
//   centerLatitude: number;
//   centerLongitude: number;
//   radiusKilometers: number;
//   country: string;
// }

// export interface BoundsInterface {
//   north: number;
//   south: number;
//   east: number;
//   west: number;
// }

export interface CustomerSettingsInterface {
  address: string;
  lat: number;
  lng: number;
  
  // radius: number;
  // bounds: BoundsInterface;
  // country: string | null;
}

// export interface SearchOriginInterface {
//   country: string | null,
//   bounds: BoundsInterface
// }