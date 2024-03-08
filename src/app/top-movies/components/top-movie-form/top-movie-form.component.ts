import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie } from 'src/models/movie.model';
import { TopMovie } from 'src/models/topMovie.model';
import { TopMoviesService } from 'src/services/topMovies.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-top-movie-form',
  templateUrl: './top-movie-form.component.html',
  styleUrls: ['./top-movie-form.component.css'],
})
export class TopMovieFormComponent implements OnInit {
  public topMovie: TopMovie = {
    id: '',
    years: 0,
    title: '',
    movies: [],
  };
  public topMovieForm: FormGroup;
  public errorMessage: string = '';
  movieRanks: { [key: number]: number } = {};
  @Input() topId: string | null;
  @Input() movies: Movie[];
  @Input() years: number | undefined;
  @Input() isEditMode: boolean | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private topMoviesService: TopMoviesService
  ) {
    this.movies = [];
    this.isEditMode = false;
    this.topId = '';
    this.topMovieForm = this.formBuilder.group({
      title: ['', Validators.required],
      movies: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    if (this.topId !== null) {
      this.topMoviesService.getById(this.topId).subscribe((topMovie) => {
        this.topMovie = topMovie;
        this.updateTitleValidity();
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.updateTopMovie();
    } else {
      this.addTopMovie();
    }
  }
  updateTopMovie() {
    if (!this.topMovieForm.invalid) {
      this.topMovie.movies = this.removeNullElements(this.topMovie.movies);
      this.topMoviesService.update(this.topMovie).subscribe({
        next: (v) => {
          console.log(v);
          toastr.success('Films correctement sauvegardé!', '', {
            positionClass: 'toast-top-center',
            timeOut: 2000,
          });
        },
        complete: () => {},
        error: (e) => {
          this.errorMessage = e;
          toastr.error("Une erreur s'est produite.", '', {
            positionClass: 'toast-top-center',
            timeOut: 2000,
          });
        },
      });
    }
  }

  removeNullElements(list: Movie[]): Movie[] {
    return list.filter((element) => element !== null);
  }

  addTopMovie() {
    if (!this.topMovieForm.invalid) {
      this.topMovie.id = uuidv4();

      if (this.years !== undefined) this.topMovie.years = this.years;
      this.removeNullElements(this.topMovie.movies);
      this.topMoviesService.save(this.topMovie).subscribe({
        next: (v) => {
          console.log(v);
          toastr.success('Films correctement sauvegardé!', '', {
            positionClass: 'toast-top-center',
            timeOut: 2000,
          });
        },
        complete: () => {
          this.resetForm();
        },
        error: (e) => {
          this.errorMessage = e;
          toastr.error("Une erreur s'est produite.", '', {
            positionClass: 'toast-top-center',
            timeOut: 2000,
          });
        },
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes &&
      changes['years'] !== undefined &&
      changes['years'].currentValue !== undefined &&
      changes['years'].currentValue !== changes['years'].previousValue
    ) {
      this.resetForm();
    }
  }

  resetForm() {
    this.topMovieForm.reset();
    this.movieRanks = {};
    this.topMovie.movies = [];
    this.topMovie.title = '';
  }

  addMovieToList(movie: Movie, rank: number) {
    if (rank >= 1 && rank <= 15) {
      this.topMovie.movies[rank - 1] = movie;
    }
  }

  removeMovieFromList(rank: number): void {
    if (rank >= 1 && rank <= 15) {
      this.topMovie.movies.splice(rank - 1, 1);
    }
  }

  //title
  updateTitleValidity() {
    if (this.topMovie.title) {
      this.topMovieForm.controls['title'].setErrors(null);
    } else {
      this.topMovieForm.controls['title'].setErrors({ required: true });
    }
  }
}
