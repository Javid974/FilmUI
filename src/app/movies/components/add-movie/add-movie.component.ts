import { Component } from '@angular/core';

import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Country } from 'src/models/country.model';
import { Director } from 'src/models/director.model';
import { Genre } from 'src/models/genre.model';
import { Movie } from 'src/models/movie.model';
import { SupportEnum } from 'src/app/enum/support.enum';
import { TmdbService } from 'src/services/tmdb.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent {
  public query: string = '';
  public selectedMovie: Movie;

  public countryIds?: string[];

  public errorMessage: string = '';

  constructor(private tmdbService: TmdbService) {
    this.selectedMovie = {
      uuid: '',
      id: 0,
      title: '',
      originalTitle: '',
      directors: Array<Director>(),
      genres: Array<Genre>(),
      countries: Array<Country>(),
      support: SupportEnum.None,
      overview: '',
      releaseDate: null,
      viewingDate: undefined,
      posterPath: '',
      backdropPath: '',
      mightWatch: false,
      viewingYear: 0,
    };
  }

  ngOnInit() {}

  async selectedItem($event: NgbTypeaheadSelectItemEvent<any>): Promise<void> {
    this.errorMessage = '';
    try {
      let movie: Movie = {
        uuid: '',
        id: $event.item.id,
        title: $event.item.title,
        originalTitle: $event.item.original_title,
        directors: [],
        genres: [],
        countries: [],
        support: SupportEnum.None,
        viewingDate: new Date($event.item.release_date),
        viewingYear: 0,
        overview: $event.item.overview,
        releaseDate: $event.item.release_date,
        posterPath: $event.item.poster_path,
        backdropPath: $event.item.backdrop_path,
        additionalInfos: $event.item.additionalInfos,
        mightWatch:
          $event.item.mightWatch != null ? $event.item.mightWatch : false,
        imdbNote: $event.item.imdbNote,
        senscritiqueNote: $event.item.senscritiqueNote,
      };

      const creditsResponse = await this.tmdbService.getMovieCredits(movie.id);
      movie.directors = this.getDirectors(creditsResponse.data);

      const detailsResponse = await this.tmdbService.getMovieDetails(movie.id);
      const movieDetails = detailsResponse.data;

      // Here you can set the fields from detailsResponse.data one by one as you need
      movie.genres = movieDetails.genres.map((genre: any) => ({
        id: genre.id,
        name: genre.name,
      }));

      this.countryIds = movieDetails.production_countries.map(
        (country: any) => ({
          iso_3166_1: country.iso_3166_1,
        })
      );

      this.selectedMovie = movie;
    } catch (error) {
      // handle error appropriately
      this.errorMessage = 'An error occurred : ' + error;
    }
  }

  getDirectors(movieCredits: any): { id: number; name: string }[] {
    return movieCredits.crew
      .filter((crewMember: any) => crewMember.job === 'Director')
      .map((director: Director) => ({
        id: director.id,
        name: director.name,
      }));
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term: string) => this.tmdbService.searchMovies(term)),
      map((response: any) => response.data.results)
    );

  formatMovie(movie: any) {
    if (!movie) return '';

    const releaseYear = movie.release_date
      ? `${new Date(movie.release_date).getFullYear()}`
      : '';
    return `${movie.title} (${releaseYear})`;
  }
}
