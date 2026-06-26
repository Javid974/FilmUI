import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Movie } from 'src/models/movie.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private buildErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      return `Une erreur s'est produite : ${error.error.message}`;
    }

    const apiError = error.error;

    if (typeof apiError === 'string') {
      return `Erreur ${error.status}: ${apiError}`;
    }

    if (apiError?.errors?.length) {
      const messages = apiError.errors
        .map((item: { message?: string }) => item.message)
        .filter((message: string | undefined) => !!message)
        .join(' ');

      if (messages) {
        return messages;
      }
    }

    if (apiError?.message) {
      return apiError.message;
    }

    return `Erreur ${error.status}: Une erreur inconnue s'est produite.`;
  }

  getAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`);
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/movies/upload`, formData).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        return throwError(() => this.buildErrorMessage(errorResponse));
      })
    );
  }

  importFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/movies/import`, formData).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        return throwError(() => this.buildErrorMessage(errorResponse));
      })
    );
  }

  downloadFile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies/download`, { responseType: 'blob' });
  }

  getByYears(years: number | undefined): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies/years/${years}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.buildErrorMessage(error));
      })
    );
  }

  getByUuid(id: string | null): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${id}`);
  }

  update(movie: Movie): Observable<any> {
    const url = `${this.apiUrl}/movies/${movie.uuid}`; // Assuming movie has an id field
    return this.http.put(url, movie);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/movies/${id}`);
  }

  save(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}/movies`, movie).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.buildErrorMessage(error));
      })
    );
  }
}
