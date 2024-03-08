import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { EditTopMovieComponent } from './edit-top-movie.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TopMoviesModule } from '../../top-movies.module';

describe('EditTopMovieComponent', () => {
  let component: EditTopMovieComponent;
  let fixture: ComponentFixture<EditTopMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTopMovieComponent],
      imports: [HttpClientTestingModule, TopMoviesModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? '1' : '2023'), // Retourne des valeurs fictives pour 'id' et 'years'
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTopMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
