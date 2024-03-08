import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { convertToParamMap } from '@angular/router';
import { DirectorDetailComponent } from './director-detail.component';
import { StatisticsService } from 'src/services/statistics.service';

describe('DirectorDetailComponent', () => {
  let component: DirectorDetailComponent;
  let fixture: ComponentFixture<DirectorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectorDetailComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'director-detail/:id', component: DirectorDetailComponent }
        ]),
        HttpClientTestingModule // Add this
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '123' // replace '123' with the value you want to test
              })
            },
            paramMap: of(convertToParamMap({ id: '123' }))
          },
        },
        {
          provide: StatisticsService,
          useValue: {
            getDirector: (id: string) => of({}),
            getMoviesByDirectorId: (id: string) => of([]),
          },
        },
      ],

    })
      .compileComponents();

    fixture = TestBed.createComponent(DirectorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
