import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as saveAs from 'file-saver';
import { Subject, takeUntil } from 'rxjs';
import { SupportEnum } from 'src/app/enum/support.enum';
import { Country } from 'src/models/country.model';
import { Director } from 'src/models/director.model';
import { Genre } from 'src/models/genre.model';
import { Movie } from 'src/models/movie.model';
import { TopMovie } from 'src/models/topMovie.model';
import { DisplayService } from 'src/services/display.services';
import { TmdbService } from 'src/services/tmdb.service';
import { TopMoviesService } from 'src/services/topMovies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './top-movie-list.component.html',
  styleUrls: ['./top-movie-list.component.css'],
})
export class TopMoviesComponent implements OnInit {
  years: number[] = [];
  movies: Array<Movie> = [];
  selectedYears: number | undefined;
  selectedMovie: Movie = {
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
  topMovies: Array<TopMovie> = [];

  private destroyed$ = new Subject();
  imageUrl: string = '';
  failedImagesMap: Map<number, number[]> = new Map<number, number[]>(); // Map of movie index and failed image indices
  failedImageIndices: number[] = [];
  isImageValid = false;
  constructor(
    private topMoviesService: TopMoviesService,
    private tmdbService: TmdbService,
    private displayService: DisplayService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2005; year--) {
      this.years.push(year);
    }
    this.selectedYears = this.years[0];
    this.getTopMoviesByYears(this.selectedYears);
  }

  onYearChange(years: number | undefined) {
    this.selectedYears = years;
    this.getTopMoviesByYears(this.selectedYears);
  }

  handleDownload() {
    // Votre logique de téléchargement ici
    this.topMoviesService.downloadFile().subscribe({
      next: (blob: any) => {
        saveAs(blob, "topFilms.json");
      },
      error: (err) => {
        console.error("Erreur lors du téléchargement du fichier:", err);
      },
    });

  }

  onFileSelected(file: File): void {
    console.log('Fichier reçu:', file);
    this.topMoviesService.importFile(file).subscribe({
      next: (response: any) => {
        console.log('Réponse du serveur:', response);
        toastr.success('Tops correctement sauvegardé!', '', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });

      },
      error: (err) => {
        this.topMoviesService = err;
      },
    });
  }

  getTopMoviesByYears(years: number | undefined): void {
    this.topMoviesService
      .getTopMoviesByYears(years)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (topMovies) => {
          this.topMovies = topMovies;
        },
      });
  }

  getImage(posterPath: string) {
    return this.tmdbService.getImageUrl(posterPath);
  }

  handleImageError(topIndex: number, movieIndex: number): void {
    if (this.failedImagesMap.has(topIndex)) {
      this.failedImagesMap.get(topIndex)?.push(movieIndex);
    } else {
      this.failedImagesMap.set(topIndex, [movieIndex]);
    }
  }

  getNamesList(items: { name: string }[]): string {
    return this.displayService.getNamesList(items);
  }

  getFormattedDate(date: string | null): string {
    return this.displayService.getFormattedDate(date);
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
  }

  deleteTopMovie(topId: string) {
    this.topMoviesService.delete(topId).subscribe({
      next: () => {
        this.getTopMoviesByYears(this.selectedYears);
      },
    });
  }
  addTopMovie() {
    this.router.navigate(['/add-top-movie']);
  }

  goToEditTop(topId: string) {
    this.router.navigate(['/edit-top-movie', topId]);
  }
}
