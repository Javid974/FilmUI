import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/services/movies.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { of } from 'rxjs';
import { RendererFactory2 } from '@angular/core';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  // Créez un faux film ici
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
    const fakeElement = document.createElement('div');
    fakeElement.id = 'fakeElement'; // exemple : ajouter un attribut "id"
    const renderer2Spy = jasmine.createSpyObj('Renderer2', {
      selectRootElement: fakeElement,
      createElement: fakeElement,
      parentNode: () => fakeElement,
      insertBefore: () => {},
      setAttribute: null,
      appendChild: null,
      createComment: () => {},
      createText: () => {},
      listen: () => {},
      setValue: () => {},
      destroy: () => {},
    });

    await TestBed.configureTestingModule({
      declarations: [MovieDetailComponent, ConfirmationDialogComponent],
      imports: [],
      providers: [
        BsModalService,
        {
          provide: RendererFactory2,
          useValue: {
            createRenderer: () => renderer2Spy,
          },
        },
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
                get: (key: string) => 'mock-uuid', // Vous pouvez changer cette valeur pour des cas de tests spécifiques
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
