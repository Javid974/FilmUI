import { Movie } from './movie.model';

export interface TopMovie {
  id: string;
  years: number;
  title: string;
  movies: Array<Movie>;
}
