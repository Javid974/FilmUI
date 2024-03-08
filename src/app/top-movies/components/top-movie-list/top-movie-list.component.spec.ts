import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TopMoviesComponent } from './top-movie-list.component';
import { TopMoviesService } from 'src/services/topMovies.service';
import { YearSelectComponent } from 'src/app/shared/components/year-select/year-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
describe('MovieListComponent', () => {
  let component: TopMoviesComponent;
  let fixture: ComponentFixture<TopMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopMoviesComponent, YearSelectComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: TopMoviesService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TopMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
