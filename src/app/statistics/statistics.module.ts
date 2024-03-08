import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DirectorsComponent } from './components/directors/directors.component';
import { RouterModule } from '@angular/router';
import { DirectorDetailComponent } from './components/director-detail/director-detail.component';

@NgModule({
  declarations: [
    StatisticsComponent,
    DirectorsComponent,
    DirectorDetailComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule, StatisticsRoutingModule],
})
export class StatisticsModule {}
