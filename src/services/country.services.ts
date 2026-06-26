import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://api.restcountries.com/countries/v5';

  constructor(private http: HttpClient) {}

  private buildErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const apiError = error.error;

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

      if (typeof apiError === 'string') {
        return apiError;
      }

      return `Erreur ${error.status}: Une erreur s'est produite avec RestCountries.`;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return String(error);
  }

  getRegion(iso: string): Observable<string> {
    const apiKey = environment.restCountriesApiKey;

    if (!apiKey) {
      return throwError(() => 'Cle API RestCountries manquante dans environment.restCountriesApiKey.');
    }

    const url = `${this.apiUrl}/codes.alpha_2/${iso.toUpperCase()}?response_fields=region`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${apiKey}`,
    });

    return this.http.get<any>(url, { headers }).pipe(
      map((response: any) => {
        const country = response?.data?.objects?.[0] ?? response?.data?.[0] ?? response?.data ?? response;

        if (country.region) {
          return country.region;
        }

        throw new Error('Pays non trouve ou region non specifiee.');
      }),
      catchError((error: unknown) => {
        return throwError(() => this.buildErrorMessage(error));
      })
    );
  }
}
