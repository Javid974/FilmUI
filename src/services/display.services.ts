import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
  constructor() {}

  getFormattedDate(date: string | null): string {
    if (!date) return 'Inconnue';

    const dateFormatted = new Date(date);

    return `${dateFormatted.getDate()}/${
      dateFormatted.getMonth() + 1
    }/${dateFormatted.getFullYear()}`;
  }

  getNamesList(items: { name: string }[]): string {
    return items.map((item) => item.name).join(', ');
  }

  getCountriesList(items: { native_name: string }[]): string {
    return items.map((item) => item.native_name).join(', ');
  }
}
