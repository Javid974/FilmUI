import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MoviesService } from './movies.service';
import { Movie } from 'src/models/movie.model';
import { SupportEnum } from 'src/app/enum/support.enum';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService],
    });
    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return an Observable<Movie[]>', () => {
      const mockMovies: Movie[] = [
        {
          uuid: 'movie1',
          id: 1,
          directors: [
            { id: 1, name: 'Director 1' },
            { id: 2, name: 'Director 2' },
          ],
          title: 'Movie 1',
          originalTitle: 'Original Movie 1',
          overview: 'Overview of Movie 1',
          releaseDate: new Date('2022-01-01'),
          posterPath: 'movie1-poster.jpg',
          backdropPath: 'movie1-backdrop.jpg',
          support: SupportEnum.DVD,
          mightWatch: false,
          viewingYear: 2022,
          viewingDate: new Date('2022-02-01'),
          genres: [
            { id: 1, name: 'Action' },
            { id: 2, name: 'Adventure' },
          ],
          countries: [
            {
              iso_3166_1: 'fr',
              english_name: 'USA',
              native_name: 'USA',
              region: 'Americas',
            },
            {
              iso_3166_1: 'fr',
              english_name: 'Canada',
              native_name: 'Canada',
              region: 'Americas',
            },
          ],
        },
        {
          uuid: 'movie2',
          id: 2,
          directors: [
            { id: 3, name: 'Director 3' },
            { id: 4, name: 'Director 4' },
          ],
          title: 'Movie 2',
          mightWatch: false,
          viewingYear: 2022,
          viewingDate: new Date('2022-02-01'),
          originalTitle: 'Original Movie 2',
          overview: 'Overview of Movie 2',
          releaseDate: new Date('2022-02-01'),
          posterPath: 'movie2-poster.jpg',
          backdropPath: 'movie2-backdrop.jpg',
          support: SupportEnum.BluRay,
          genres: [
            { id: 3, name: 'Comedy' },
            { id: 4, name: 'Drama' },
          ],
          countries: [
            {
              iso_3166_1: 'fr',
              english_name: 'USA',
              native_name: 'USA',
              region: 'Americas',
            },
            {
              iso_3166_1: 'fr',
              english_name: 'Canada',
              native_name: 'Canada',
              region: 'Americas',
            },
          ],
        },
      ];

      service.getAll().subscribe((movies) => {
        expect(movies.length).toBe(2);
        expect(movies).toEqual(mockMovies);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/movies`);
      expect(req.request.method).toBe('GET');
      req.flush(mockMovies);
    });
  });

  describe('saveMovie', () => {
    it('should return an Observable<Movie> with the saved movie', () => {
      const mockMovie: Movie = {
        uuid: 'movie1',
        id: 1,
        directors: [
          { id: 1, name: 'Director 1' },
          { id: 2, name: 'Director 2' },
        ],
        title: 'Movie 1',
        originalTitle: 'Original Movie 1',
        overview: 'Overview of Movie 1',
        releaseDate: new Date('2022-01-01'),
        posterPath: 'movie1-poster.jpg',
        backdropPath: 'movie1-backdrop.jpg',
        support: SupportEnum.DVD,
        mightWatch: false,
        viewingDate: new Date('2022-01-01'),
        viewingYear: 2022,
        genres: [
          { id: 1, name: 'Action' },
          { id: 2, name: 'Adventure' },
        ],
        countries: [
          {
            iso_3166_1: 'US',
            english_name: 'United States',
            native_name: 'United States',
            region: 'Americas',
          },
          {
            iso_3166_1: 'CA',
            english_name: 'Canada',
            native_name: 'Canada',
            region: 'Americas',
          },
        ],
      };
      const mockSavedMovie: Movie = {
        uuid: 'movie1',
        id: 1,
        directors: [
          { id: 1, name: 'Director 1' },
          { id: 2, name: 'Director 2' },
        ],
        title: 'Movie 1',
        originalTitle: 'Original Movie 1',
        overview: 'Overview of Movie 1',
        releaseDate: new Date('2022-01-01'),
        posterPath: 'movie1-poster.jpg',
        backdropPath: 'movie1-backdrop.jpg',
        support: SupportEnum.DVD,
        mightWatch: false,
        viewingDate: new Date('2022'),
        viewingYear: 2022,
        genres: [
          { id: 1, name: 'Action' },
          { id: 2, name: 'Adventure' },
        ],
        countries: [
          {
            iso_3166_1: 'US',
            english_name: 'United States',
            native_name: 'United States',
            region: 'Americas',
          },
          {
            iso_3166_1: 'CA',
            english_name: 'Canada',
            native_name: 'Canada',
            region: 'Americas',
          },
        ],
      };

      service.save(mockMovie).subscribe((savedMovie) => {
        expect(savedMovie).toEqual(mockSavedMovie);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/movies`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockMovie);
      req.flush(mockSavedMovie);
    });
  });
});
