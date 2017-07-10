import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TalksAndFiltersComponent } from './components/talks-and-filters.component';
import { TalkDetailsComponent } from './components/talk-details.component';

const routes: Route[] = [
  { path: 'talks',  pathMatch: 'full', component: TalksAndFiltersComponent },
  { path: 'talk/:id', component: TalkDetailsComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TalksRoutingModule {}
