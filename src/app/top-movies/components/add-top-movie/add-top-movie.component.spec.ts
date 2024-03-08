import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddTopMovieComponent } from './add-top-movie.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { TopMoviesModule } from '../../top-movies.module';

describe('AddTopMovieComponent', () => {
  let component: AddTopMovieComponent;
  let fixture: ComponentFixture<AddTopMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTopMovieComponent],
      imports: [HttpClientTestingModule, TopMoviesModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTopMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
