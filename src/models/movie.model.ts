import { SupportEnum } from '../app/enum/support.enum';
import { Country } from './country.model';
import { Director } from './director.model';
import { Genre } from './genre.model';

export interface Movie {
  uuid: string;
  id: number;
  directors: Array<Director>;
  title: string;
  originalTitle: string;
  viewingDate: Date | undefined;
  viewingYear: number;
  overview: string;
  releaseDate: Date | null;
  posterPath: string;
  backdropPath: string;
  support: SupportEnum;
  genres: Array<Genre>;
  countries: Array<Country>;
  mightWatch: boolean;
  imdbNote?: number;
  senscritiqueNote?: number;
  averageNote?: number;
  additionalInfos?: string;
  [key: string]: any;
}
