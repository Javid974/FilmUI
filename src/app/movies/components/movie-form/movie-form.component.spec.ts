import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFormComponent } from './movie-form.component';
import { MoviesService } from 'src/services/movies.service';
import { HttpClientModule } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
describe('MovieFormComponent', () => {
  let component: MovieFormComponent;
  let fixture: ComponentFixture<MovieFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieFormComponent],
      imports: [
        HttpClientModule,
        NgMultiSelectDropDownModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [MoviesService],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
