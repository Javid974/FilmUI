import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupportEnum } from 'src/app/enum/support.enum';
import { Country } from 'src/models/country.model';
import { Director } from 'src/models/director.model';
import { Genre } from 'src/models/genre.model';
import { Movie } from 'src/models/movie.model';
import { MoviesService } from 'src/services/movies.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css'],
})
export class EditMovieComponent {
  public movie: Movie;
  public movieUuid: string | null = '';
  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) {
    this.movie = {
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
      posterPath: '',
      backdropPath: '',
      mightWatch: false,
      viewingDate: undefined,
      viewingYear: 0,
    };
  }

  ngOnInit() {
    this.movieUuid = this.route.snapshot.paramMap.get('id');
    this.moviesService.getByUuid(this.movieUuid).subscribe((movie) => {
      this.movie = movie;
      if (movie.viewingDate)
        this.movie.viewingDate = new Date(movie.viewingDate);
    });
  }
}
