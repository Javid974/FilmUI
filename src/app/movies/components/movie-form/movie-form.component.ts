import { Component, OnInit, Input } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SupportEnum } from 'src/app/enum/support.enum';
import { Country } from 'src/models/country.model';
import { Director } from 'src/models/director.model';
import { Genre } from 'src/models/genre.model';
import { Movie } from 'src/models/movie.model';
import { Support } from 'src/models/support.model';
import { MoviesService } from 'src/services/movies.service';
import { TmdbService } from 'src/services/tmdb.service';
import { v4 as uuidv4 } from 'uuid';
import * as toastr from 'toastr';
import { CountryService } from 'src/services/country.services';
import {
  Observable,
  concatMap,
  forkJoin,
  from,
  mergeMap,
  throwError,
  toArray,
} from 'rxjs';
@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
})
export class MovieFormComponent implements OnInit {
  private _selectedMovie: Movie;
  private _countryIds?: string[];
  public supports: Array<Support> = [];

  @Input()
  set selectedMovie(value: Movie) {
    this._selectedMovie = value;
    this.onSelectedMovieChanged();
  }
  @Input()
  isEditMode!: boolean;

  @Input()
  set countryIds(value: string[] | undefined) {
    this._countryIds = value;
    this.onCountryIdsChanged();
  }

  get countryIds(): string[] | undefined {
    return this._countryIds;
  }

  get selectedMovie() {
    return this._selectedMovie;
  }

  public movieForm: FormGroup;
  public directorsForm: FormArray;
  public countries: Array<Country> = Array<Country>();
  public genres: Array<Genre> = Array<Genre>();
  public dropdownSettings = {};
  public submitted = false;
  public errorMessage: string = '';
  public myDate: Date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private tmdbService: TmdbService,
    private moviesService: MoviesService,
    private countryService: CountryService
  ) {
    this._selectedMovie = {
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
      additionalInfos: '',
      viewingYear: 0,
    };

    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      originalTitle: [''],
      releaseDate: ['', Validators.required],
      description: [''],
      additionalInfos: [''],
      genres: [[], this.validateGenres],
      countries: [[]],
      support: [''],
      directors: this.formBuilder.array([this.formBuilder.control('')]),
      imdbNote: [0],
      senscritiqueNote: [0],
    });

    this.supports = [
      { text: '-- Sélectionner un support --', value: SupportEnum.None },
      { text: 'Cinéma', value: SupportEnum.Cinéma },
      { text: 'Blu-ray', value: SupportEnum.BluRay },
      { text: 'DVD', value: SupportEnum.DVD },
      { text: 'Netflix', value: SupportEnum.Netflix },
      { text: 'Amazon Prime Video', value: SupportEnum.AmazonPrimes },
      { text: 'Disney +', value: SupportEnum.DisneyPlus },
      { text: 'DIVX', value: SupportEnum.DIVX },
      { text: 'VOD', value: SupportEnum.VOD },
      { text: 'Avion', value: SupportEnum.Avion },
      { text: 'TV', value: SupportEnum.TV },
      { text: 'Youtube', value: SupportEnum.Youtube },
    ];

    this.directorsForm = this.getDirectorsControl();
  }

  ngOnInit(): void {
    this.setFirstDirectorValidator();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'iso_3166_1',
      textField: 'native_name',
      enableCheckAll: false,
      itemsShowLimit: 12,
      allowSearchFilter: true,
    };

    this.tmdbService.getMovieCountries().then((response: any) => {
      this.countries = response.data;
    });

    this.movieForm.controls['countries'].setValidators(Validators.required);
    this.movieForm.controls['countries'].updateValueAndValidity();

    this.tmdbService.getMoviesGenres().then((response: any) => {
      this.genres = response.data.genres;
    });
  }

  setFirstDirectorValidator(): void {
    const directorsFormArray = this.getDirectorsControl();
    const firstDirectorControl = directorsFormArray.at(0);
    firstDirectorControl.setValidators(Validators.required);
    firstDirectorControl.updateValueAndValidity();
  }

  onSelectedMovieChanged(): void {
    if (this.selectedMovie.directors.length > 0) {
      this.errorMessage = '';
      this.setDirectorsFormArray(this.selectedMovie.directors);
      this.updateTitleValidity();
      this.updateOriginalTitleValidity();
      this.updateReleaseDateValidity();
      this.updateGenresValidity();
    }
  }

  onCountryIdsChanged(): void {
    // Code à exécuter lorsque countryIds change.
    if (this.countryIds === undefined) {
      return;
    }
    this.selectedMovie.countries = this.countries.filter((country) => {
      return this.countryIds?.some(
        (selectedCountry: any) =>
          selectedCountry.iso_3166_1 === country.iso_3166_1
      );
    });

    this.updateCountriesValidity();
  }

  //genres
  isGenreSelected(genre: any): boolean {
    return this.selectedMovie.genres.some(
      (selectedGenre) => selectedGenre.id === genre.id
    );
  }

  updateSelectedGenres(event: any, genre: any): void {
    const isChecked = event.target.checked;

    if (isChecked) {
      this.selectedMovie.genres.push(genre);
    } else {
      this.selectedMovie.genres = this.selectedMovie.genres.filter(
        (selectedGenre) => selectedGenre.id !== genre.id
      );
    }
    this.movieForm.patchValue({
      genres: this.selectedMovie.genres,
    });
  }

  validateGenres(control: AbstractControl): { [key: string]: any } | null {
    const genres = control.value;
    if (genres && genres.length > 0) {
      return null;
    } else {
      return { noGenresSelected: true };
    }
  }

  updateGenresValidity() {
    if (this.selectedMovie.genres.length > 0) {
      this.movieForm.controls['genres'].setErrors(null);
    } else {
      this.movieForm.controls['genres'].setErrors({ required: true });
    }
  }

  //countries
  updateCountriesValidity() {
    if (this.selectedMovie.countries.length > 0) {
      this.movieForm.controls['countries'].setErrors(null);
    } else {
      this.movieForm.controls['countries'].setErrors({ required: true });
    }
  }

  onCountrySelected() {
    this.updateCountriesValidity();
  }

  onCountryDeselected() {
    this.updateCountriesValidity();
  }

  //title
  updateTitleValidity() {
    if (this.selectedMovie.title) {
      this.movieForm.controls['title'].setErrors(null);
    } else {
      this.movieForm.controls['title'].setErrors({ required: true });
    }
  }

  //original title
  updateOriginalTitleValidity() {
    if (this.selectedMovie.originalTitle) {
      this.movieForm.controls['originalTitle'].setErrors(null);
    } else {
      this.movieForm.controls['originalTitle'].setErrors({ required: true });
    }
  }

  //release date
  updateReleaseDateValidity(newDate?: string) {
    if (newDate) {
      this.selectedMovie.releaseDate = new Date(newDate + 'T00:00:00');
      this.movieForm.controls['releaseDate'].setErrors(null);
    } else if (newDate === '') {
      this.selectedMovie.releaseDate = null;
      this.movieForm.controls['releaseDate'].setErrors({ required: true });
    } else if (this.selectedMovie.releaseDate) {
      this.movieForm.controls['releaseDate'].setErrors(null);
    }
  }

  //directors
  getDirectorsControl(): FormArray {
    return this.movieForm.get('directors') as FormArray;
  }

  addDirector() {
    const control = this.formBuilder.control('');
    control.setValidators(Validators.required);
    control.updateValueAndValidity();
    this.directorsForm.push(control);
  }

  updateDirectorList($event: any, index: number): void {
    if (this.selectedMovie.directors.length > index) {
      if ($event.value === '') {
        this.selectedMovie.directors.splice(index, 1);
        const directorConrol = this.directorsForm.at(index);
        directorConrol.setValidators(Validators.required);
        directorConrol.updateValueAndValidity();
      } else {
        this.selectedMovie.directors[index].name = $event.value;
      }
    } else {
      this.selectedMovie.directors.push({ id: 0, name: $event.value });
    }
  }

  removeDirector(index: number) {
    this.selectedMovie.directors.splice(index, 1);
    this.directorsForm.removeAt(index);
  }

  setDirectorsFormArray(directors: { id: number; name: string }[]): void {
    const directorsFormArray = this.getDirectorsControl();

    directorsFormArray.clear();

    directors.forEach((director) => {
      directorsFormArray.push(this.formBuilder.control(director.name));
    });
  }

  //note

  limitImdbInput(event: any) {
    const value = event.target.value;

    if (value > 10) {
      this.selectedMovie.imdbNote = 10;
    } else if (value < 1) {
      this.selectedMovie.imdbNote = 1;
    } else {
      this.selectedMovie.imdbNote = value;
    }
  }
  limitSenscritiqueInput(event: any) {
    const value = event.target.value;

    if (value > 10) {
      this.selectedMovie.senscritiqueNote = 10;
    } else if (value < 1) {
      this.selectedMovie.senscritiqueNote = 1;
    } else {
      this.selectedMovie.senscritiqueNote = value;
    }
  }

  resetForm() {
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
      additionalInfos: '',
      releaseDate: null,
      posterPath: '',
      backdropPath: '',
      mightWatch: false,
      viewingDate: undefined,
      viewingYear: 0,
    };
    this.movieForm.reset();
    this.setFirstDirectorValidator();
    // seulement si vous utilisez un formulaire réactif
  }
  private addRegion(): Observable<any> {
    return from(this.selectedMovie.countries).pipe(
      concatMap((country: Country) =>
        this.countryService.getRegion(country.iso_3166_1).pipe(
          concatMap((region: string) => {
            country.region = this.traduceRegion(region.toLowerCase());
            return from([country]);
          })
        )
      ),
      toArray()
    );
  }

  private traduceRegion(region: string): string {
    switch (region) {
      case 'asia':
        return 'Asie';
      case 'americas':
        return 'Amérique';
      case 'oceania':
        return 'Oceanie';
      case 'africa':
        return 'Afrique';
      case 'europe':
        return 'Europe';
      default:
        return region;
    }
  }

  addMovie() {
    // Code to add a new movie
    this.addRegion()
      .pipe(
        concatMap(() => {
          if (!this.movieForm.invalid) {

            return this.moviesService.save(this.selectedMovie);
          } else {
            return (this.errorMessage = 'Invalid form');
          }
        })
      )
      .subscribe({
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

  updateMovie() {
    // Code to update existing movie
    if (!this.movieForm.invalid) {
      this.moviesService.update(this.selectedMovie).subscribe({
        // Handle response here
        next: (v) => {
          console.log(v);
          toastr.success('Films correctement modifié!', '', {
            positionClass: 'toast-top-center',
            timeOut: 2000,
          });
        },
        complete: () => { },
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

  onSubmit() {
    this.submitted = true;
    if (this.isEditMode) {
      this.updateMovie();
    } else {
      this.selectedMovie.uuid = uuidv4();
      this.addMovie();
    }
  }
}
