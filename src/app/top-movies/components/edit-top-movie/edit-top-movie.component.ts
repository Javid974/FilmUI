import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/models/movie.model';
import { TopMovie } from 'src/models/topMovie.model';
import { TopMoviesService } from 'src/services/topMovies.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-top-movie',
  templateUrl: './edit-top-movie.component.html',
  styleUrls: ['./edit-top-movie.component.css'],
})
export class EditTopMovieComponent {
  public topId: string | null;
  public years: number | undefined;
  public topMovie!: TopMovie;
  public movies: Array<Movie> = [];
  constructor(
    private route: ActivatedRoute,
    private topMoviesService: TopMoviesService
  ) {
    this.topId = this.route.snapshot.paramMap.get('id');
    let years = this.route.snapshot.paramMap.get('years');
    this.years = years ? Number(years) : undefined;
  }

  ngOnInit() {
    this.topMoviesService.getMoviesByYears(this.years).subscribe((movies) => {
      this.movies = movies;
    });
  }
}
