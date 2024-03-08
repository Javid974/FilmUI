import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMovieComponent } from './add-movie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from 'src/services/movies.service';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MovieFormComponent } from '../movie-form/movie-form.component';
describe('AddMovieComponent', () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMovieComponent, MovieFormComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        NgbTypeaheadModule,
        NgMultiSelectDropDownModule,
      ],
      providers: [MoviesService],
    }).compileComponents();

    fixture = TestBed.createComponent(AddMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
