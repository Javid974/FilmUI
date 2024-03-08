import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { TopMovieFormComponent } from './top-movie-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TopMoviesService } from 'src/services/topMovies.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TopMovieFormComponent', () => {
  let component: TopMovieFormComponent;
  let fixture: ComponentFixture<TopMovieFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopMovieFormComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [FormBuilder, TopMoviesService],
    }).compileComponents();

    fixture = TestBed.createComponent(TopMovieFormComponent);
    component = fixture.componentInstance;
    component.topMovieForm = new FormBuilder().group({
      title: '',
      movies: [],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
