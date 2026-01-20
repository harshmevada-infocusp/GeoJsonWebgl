// Root GeoJSON object
export interface GeoJSONMinimal {
  type: string;
  features: CountryFeature[];
}

// Each country feature
export interface CountryFeature {
  type: string;
  properties: {
    name: string; // country name
  };
  geometry: {
    type: string;
    coordinates: number[][][] | number[][][][];
  };
}

export type Boundaries = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};
