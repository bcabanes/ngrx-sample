import { NgModule } from '@angular/core';
import { TalksService } from './talks.service';
import { WatchService } from './watch.service';
import { SharedModule } from '../shared/shared.module';
import { TalkComponent } from './components/talk.component';
import { FiltersComponent } from './components/filters.component';
import { RateButtonComponent } from './components/rate-button.component';
import { TalkDetailsComponent } from './components/talk-details.component';
import { TalksComponent } from './components/talks.component';
import { TalksAndFiltersComponent } from './components/talks-and-filters.component';
import { WatchButtonComponent } from './components/watch-button.component';
import { FormatRatingPipe } from './pipes/format-rating.pipe';
import { TalksRoutingModule } from './talks-routing.module';

@NgModule({
  imports: [
    SharedModule,
    TalksRoutingModule
  ],
  declarations: [
    FormatRatingPipe,
    FiltersComponent,
    RateButtonComponent,
    TalkComponent,
    TalkDetailsComponent,
    TalksComponent,
    TalksAndFiltersComponent,
    RateButtonComponent,
    WatchButtonComponent
  ],
  providers: [
    TalksService,
    WatchService
  ]
})
export class TalksModule {}
