import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v2/alpha/';

  constructor(private http: HttpClient) {}

  getRegion(iso: string): Observable<string> {
    const url = `${this.apiUrl}${iso}`;
    return this.http.get<any>(url).pipe(
      map((country: any) => {
        if (country.region) {
          return country.region;
        }
        throw new Error('Pays non trouvé ou région non spécifiée.');
      })
    );
  }
}
