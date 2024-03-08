import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Director } from 'src/models/director.model';
import { Genre } from 'src/models/genre.model';
import { Movie } from 'src/models/movie.model';
import { MoviesService } from 'src/services/movies.service';
import { Router } from '@angular/router';
import { SupportEnum } from 'src/app/enum/support.enum';
import { DisplayService } from 'src/services/display.services';
import { saveAs } from 'file-saver'; // npm install --save file-saver @types/file-saver

@Component({
  selector: 'app-movies-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MoviesComponent implements OnInit {
  movies: Array<Movie> = [];
  mightWatchMovies: Array<Movie> = [];
  private destroyed$ = new Subject();
  selectedYears: number | undefined;
  years: number[] = [];
  public errorMessage: string = '';

  constructor(
    private moviesService: MoviesService,
    private displayService: DisplayService,
    private router: Router
  ) {}

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2005; year--) {
      this.years.push(year);
    }
    this.selectedYears = this.years[0];
    this.getByYears(this.selectedYears);
  }

  handleDownload() {
    // Votre logique de téléchargement ici
    this.moviesService.downloadFile().subscribe({
      next: (blob: any) => {
        saveAs(blob, 'films.json');
      },
      error: (err) => {
        console.error('Erreur lors du téléchargement du fichier:', err);
      },
    });
  }

  onFileSelected(file: File): void {
    console.log('Fichier reçu:', file);
    this.moviesService.importFile(file).subscribe({
      next: (response: any) => {
        console.log('Réponse du serveur:', response);
        toastr.success('Films correctement sauvegardé!', '', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
      },
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }

  getSupportName(support: SupportEnum): string {
    switch (support) {
      case SupportEnum.None:
        return '';
      case SupportEnum.Cinéma:
        return 'Cinéma';
      case SupportEnum.BluRay:
        return 'Blu-ray';
      case SupportEnum.DVD:
        return 'DVD';
      case SupportEnum.Netflix:
        return 'Netflix';
      case SupportEnum.AmazonPrimes:
        return 'Amazon Prime Video';
      case SupportEnum.DIVX:
        return 'DIVX';
      case SupportEnum.DisneyPlus:
        return 'Disney +';
      case SupportEnum.VOD:
        return 'VOD';
      case SupportEnum.Avion:
        return 'Avion';
      case SupportEnum.TV:
        return 'TV';
      case SupportEnum.Youtube:
        return 'Youtube';
      default:
        return 'Unknown';
    }
  }

  onYearChange(years: number | undefined) {
    this.selectedYears = years;
    this.getByYears(this.selectedYears);
  }

  getMovies(): void {
    this.moviesService
      .getAll()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((movies) => {
        this.movies = movies;
      });
  }

  getByYears(years: number | undefined): void {
    this.moviesService
      .getByYears(years)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (movies) => {
          this.movies = movies.filter((movie: Movie) => !movie.mightWatch);
          this.errorMessage = '';
          this.mightWatchMovies = movies.filter(
            (movie: Movie) => movie.mightWatch
          );
        },
        error: (err) => {
          this.errorMessage = err;
        },
      });
  }

  getFormattedDate(date: Date | undefined): string {
    if (date === undefined) {
      return '';
    }
    let dateFromat = new Date(date);
    let options: Intl.DateTimeFormatOptions = { month: 'long' };
    return new Intl.DateTimeFormat('fr-FR', options).format(dateFromat);
  }

  getDirectorsList(directors: Array<Director>): string {
    return this.displayService.getNamesList(directors);
  }

  getGenresList(genres: Array<Genre>): string {
    return this.displayService.getNamesList(genres);
  }

  getCountriesList(items: { native_name: string }[]): string {
    return this.displayService.getCountriesList(items);
  }

  onRowClick(movie: Movie) {
    this.router.navigate(['/movie-detail', movie.uuid]);
  }

  addMovie() {
    // Naviguer vers le composant d'édition avec l'ID du film
    this.router.navigate(['/add-movie']);
  }
}
