import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieFormComponent } from '../movie-form/movie-form.component'; // Importez MovieFormComponent
import { EditMovieComponent } from './edit-movie.component';
import { MoviesService } from 'src/services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('EditMovieComponent', () => {
  let component: EditMovieComponent;
  let fixture: ComponentFixture<EditMovieComponent>;
  const mockMovie = {
    uuid: 'mock-uuid',
    id: 0,
    title: '',
    originalTitle: '',
    directors: [],
    genres: [],
    countries: [],
    support: 0,
    overview: '',
    releaseDate: null,
    posterPath: '',
    backdropPath: '',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditMovieComponent, MovieFormComponent],
      imports: [
        NgMultiSelectDropDownModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: MoviesService,
          useValue: {
            getByUuid: jasmine
              .createSpy('getByUuid')
              .and.returnValue(of(mockMovie)),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => 'id', // Vous pouvez changer cette valeur pour des cas de tests spécifiques
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
