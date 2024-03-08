import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Movie } from 'src/models/movie.model';
import { TopMovie } from 'src/models/topMovie.model';
import { TopMoviesService } from 'src/services/topMovies.service';

@Component({
  selector: 'app-add-top-movie',
  templateUrl: './add-top-movie.component.html',
  styleUrls: ['./add-top-movie.component.css'],
})
export class AddTopMovieComponent implements OnInit {
  years: number[] = [];
  selectedYears: number | undefined;
  private destroyed$ = new Subject();
  movies: Array<Movie> = [];

  constructor(private topMoviesService: TopMoviesService) {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2005; year--) {
      this.years.push(year);
    }
    this.selectedYears = this.years[0];
    this.getMoviesByYears(this.selectedYears);
  }

  onYearChange(years: number | undefined) {
    this.selectedYears = years;
    this.getMoviesByYears(this.selectedYears);
  }

  getMoviesByYears(years: number | undefined): void {
    this.topMoviesService
      .getMoviesByYears(years)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (movies) => {
          this.movies = movies;
        },
      });
  }
}
