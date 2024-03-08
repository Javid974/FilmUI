import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesComponent } from './movie-list.component';
import { MoviesService } from 'src/services/movies.service';
import { DisplayService } from 'src/services/display.services';
import { of } from 'rxjs';
import { Movie } from 'src/models/movie.model';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let moviesService: MoviesService;
  let displayService: DisplayService;
  let router: Router;

  const moviesServiceStub = {
    getAll: () => of([]),
    getByYears: () => of([]),
  };

  const displayServiceStub = {
    getNamesList: () => '',
    getCountriesList: () => '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MoviesComponent],
      providers: [
        { provide: MoviesService, useValue: moviesServiceStub },
        { provide: DisplayService, useValue: displayServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService);
    displayService = TestBed.inject(DisplayService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call movies service on init', () => {
    spyOn(moviesService, 'getByYears').and.callThrough();
    component.ngOnInit();
    expect(moviesService.getByYears).toHaveBeenCalled();
  });

  it('should navigate to movie details on row click', () => {
    spyOn(router, 'navigate').and.stub();
    const movie: Movie = { uuid: 'test-uuid' } as Movie;
    component.onRowClick(movie);
    expect(router.navigate).toHaveBeenCalledWith(['/movie-detail', movie.uuid]);
  });

  it('should navigate to add movie on addMovie call', () => {
    spyOn(router, 'navigate').and.stub();
    component.addMovie();
    expect(router.navigate).toHaveBeenCalledWith(['/add-movie']);
  });

  // Vous pouvez ajouter plus de tests ici...
});
