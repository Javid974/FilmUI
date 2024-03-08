import { Component, OnInit } from '@angular/core';
import * as saveAs from 'file-saver';
import { Subject, takeUntil } from 'rxjs';
import { Country } from 'src/models/country.model';
import { Statistics } from 'src/models/statistic.model';
import { StatisticsService } from 'src/services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  private destroyed$ = new Subject();
  public selectedYears: number | undefined;
  public years: number[] = [];

  public objectKeys = Object.keys;
  public statistics: Statistics = {
    year: 0,
    countryCount: {},
    movieCountByRegion: {},
    countriesByRegion: {},
    supportCount: {},
  };
  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2005; year--) {
      this.years.push(year);
    }
    this.selectedYears = this.years[0];
    this.getByYears(this.selectedYears);
  }

  onYearChange(years: number | undefined) {
    this.selectedYears = years;
    this.getByYears(this.selectedYears);
  }

  getByYears(years: number | undefined): void {
    this.statisticsService
      .getStatistics(years)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((statistics) => {
        this.statistics = statistics;
      });
  }

  getRegionName(region: string): string {
    switch (region) {
      case 'Americas':
        return 'Amérique';
      case 'Asia':
        return 'Asie';
      case 'Africa':
        return 'Afrique';
      case 'Oceania':
        return 'Océanie';
      // ajoutez d'autres cas ici si nécessaire
      default:
        return region;
    }
  }
}
