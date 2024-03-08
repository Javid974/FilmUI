import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { DirectorsComponent } from './components/directors/directors.component';
import { DirectorDetailComponent } from './components/director-detail/director-detail.component';

const routes: Routes = [
  { path: 'statistics', component: StatisticsComponent },
  { path: 'directors', component: DirectorsComponent },
  { path: 'director/:id', component: DirectorDetailComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class StatisticsRoutingModule {}
