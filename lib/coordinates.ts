export const au = {
  nsw: {
    north: -29.1738,
    south: -37.5052,
    east: 150.9994,
    west: 140.9994,
  },
  vic: {
    north: -35.7624,
    south: -39.136,
    east: 150.3668,
    west: 140.9617,
  },
  qld: {
    north: -9.2302,
    south: -29.1774,
    east: 153.552,
    west: 138.0023,
  },
  sa: {
    north: -25.9964,
    south: -38.038,
    east: 141.0025,
    west: 129.0001,
  },
  wa: {
    north: -13.7203,
    south: -35.0137,
    east: 129.0013,
    west: 113.1487,
  },
  tas: {
    north: -39.2357,
    south: -43.6511,
    east: 148.37,
    west: 144.5413,
  },
  nt: {
    north: -12.4366,
    south: -26.1536,
    east: 138.0014,
    west: 129.0001,
  },
};


export const countries = {
  "Australia": "au",
  "United States": "usa"
}


export const calculateBounds = (center: { lat: number; lng: number }, radius: number) => {
  const earthRadius = 6371; // Earth's radius in kilometers
  const lat1 = (Math.PI / 180) * center.lat; // Convert center latitude to radians
  const lng1 = (Math.PI / 180) * center.lng; // Convert center longitude to radians

  // Calculate the north, south, east, and west bounds
  const deltaLat = (radius / earthRadius) * (180 / Math.PI);
  const deltaLng = (radius / earthRadius) * (180 / Math.PI) / Math.cos(lat1);

  const north = center.lat + deltaLat;
  const south = center.lat - deltaLat;
  const east = center.lng + deltaLng;
  const west = center.lng - deltaLng;

  return {
    bounds: {
      north,
      south,
      east,
      west,
    },
  };
};

// const center = {
//   lat: -37.4496,
//   lng: 145.2753,
// };
// const radiusInKm = 100;
// const bounds = calculateBounds(center, radiusInKm);
// console.log(bounds);
