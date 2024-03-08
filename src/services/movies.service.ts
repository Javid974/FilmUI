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

  getAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies`);
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/movies/upload`, formData).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage: string;
        errorMessage = `Code d'erreur : ${errorResponse.status}\nMessage : ${errorResponse.error}`;
        return throwError(() => errorMessage); // Rethrow so downstream consumers can handle as well
      })
    );
  }

  importFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/movies/import`, formData).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage: string;
        errorMessage = `Code d'erreur : ${errorResponse.status}\nMessage : ${errorResponse.error}`;
        return throwError(() => errorMessage); // Rethrow so downstream consumers can handle as well
      })
    );
  }

  downloadFile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies/download`, { responseType: 'blob' });
  }

  getByYears(years: number | undefined): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies/years/${years}`).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage: string;
        if (error.error instanceof ErrorEvent) {
          // Erreur de client
          errorMessage = `Une erreur s'est produite : ${error.error.message}`;
        } else {
          // Erreur côté serveur
          const errorResponse: HttpErrorResponse = error;
          errorMessage = `Code d'erreur : ${error.status}\nMessage : ${errorResponse.error}`;
        }

        return throwError(() => errorMessage);
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
        let errorMessage: string;
        if (error.error instanceof ErrorEvent) {
          // Erreur de client
          errorMessage = `Une erreur s'est produite : ${error.error.message}`;
        } else {
          // Erreur du serveur
          const errorResponse: HttpErrorResponse = error;
          errorMessage = `Erreur ${error.status}: ${errorResponse.error}`;
        }
        return throwError(() => errorMessage);
      })
    );
  }
}
