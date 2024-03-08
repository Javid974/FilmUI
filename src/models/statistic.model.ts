import { Country } from './country.model';

export interface CountryCount {
  item1: Country;
  item2: number;
}

export interface Statistics {
  year: number;
  countryCount: Record<string, CountryCount>;
  movieCountByRegion: Record<string, number>;
  countriesByRegion: Record<string, Country[]>;
  supportCount: Record<string, number>;
}
