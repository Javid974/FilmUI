import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportEnum } from 'src/app/enum/support.enum';
import { Country } from 'src/models/country.model';
import { Director } from 'src/models/director.model';
import { Genre } from 'src/models/genre.model';
import { Movie } from 'src/models/movie.model';
import { MoviesService } from 'src/services/movies.service';
import { TmdbService } from 'src/services/tmdb.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DisplayService } from 'src/services/display.services';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movieUuid: string | null = '';
  movie: Movie;
  imageUrl: string = '';
  isImageValid = false;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private tmdbService: TmdbService,
    private router: Router,
    private modalService: BsModalService,
    private displayService: DisplayService
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
      releaseDate: new Date(),
      posterPath: '',
      backdropPath: '',
      mightWatch: false,
      viewingDate: new Date(),
      viewingYear: 0,
    };
  }

  ngOnInit() {
    this.movieUuid = this.route.snapshot.paramMap.get('id');
    // Utilisez this.movieUuid pour récupérer les détails du film
    this.moviesService.getByUuid(this.movieUuid).subscribe((movie) => {
      this.movie = movie;

      this.imageUrl = this.tmdbService.getImageUrl(movie.posterPath);
      this.validateImageUrl(this.imageUrl);
    });
  }

  validateImageUrl(url: string) {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      this.isImageValid = true;
    };
    image.onerror = () => {
      this.isImageValid = false;
    };
  }

  getNamesList(items: { name: string }[]): string {
    return this.displayService.getNamesList(items);
  }

  getCountriesList(items: { native_name: string }[]): string {
    return this.displayService.getCountriesList(items);
  }

  getFormattedDate(date: string | null): string {
    return this.displayService.getFormattedDate(date);
  }

  editMovie(movieId: string) {
    // Naviguer vers le composant d'édition avec l'ID du film
    this.router.navigate(['/edit-movie', movieId]);
  }

  deleteMovie(id: string) {
    this.moviesService.delete(id).subscribe({
      // Handle response here
      next: (v) => {
        console.log(v);

        toastr.success('Films correctement supprimé!', '', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
      },
      complete: () => {
        this.router.navigate(['/movie-list']);
      },
      error: (e) => {
        toastr.error("Une erreur s'est produite.", '', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
      },
    });
  }
}
