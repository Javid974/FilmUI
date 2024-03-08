import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-year-select',
  templateUrl: './year-select.component.html',
  styleUrls: ['./year-select.component.css'],
})
export class YearSelectComponent {
  @Input() years: number[] = [];
  @Input() selectedYear: number | undefined = this.years[0];
  @Output() yearChange = new EventEmitter<number>();

  onYearChange(event: Event): void {
    this.selectedYear = +(event.target as HTMLSelectElement).value;
    this.yearChange.emit(this.selectedYear);
  }
}
