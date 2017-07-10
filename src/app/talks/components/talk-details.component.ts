import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/mergeMap';

import { TalkType } from '../models/talk-type.model';
import { IAppState } from '../../ngrx/index';
import { TalksActions } from '../nrgx/talks.action';

@Component({
  selector: 'app-talk-details-cmp',
  template: `
    <md-card *ngIf="talk">
      <div id="rating-column">
        Rating
        <span id="rating">{{talk.rating | formatRating}}</span>
      </div>

      <div>
        <span id="title">{{talk.title}}</span>
        <span id="speaker">{{talk.speaker}}</span>

        <div id="description">
          {{talk.description}}
        </div>

        <app-watch-button [talk]="talk"
                          [watched]="isWatched"
                          (watch)="handleWatch()"></app-watch-button>
        <app-rate-button [talk]="talk" (rate)="handleRate($event)"></app-rate-button>
      </div>
    </md-card>
  `,
  styles  : [ `
    :host {
      margin : 10px;
    }

    md-card {
      display : flex;
    }

    #rating-column {
      margin-right : 20px;
    }

    #rating {
      display   : block;
      font-size : 25px;
    }

    #title {
      display   : block;
      font-size : 20px;
    }

    #speaker {
      display       : block;
      font-size     : 15px;
      margin-bottom : 20px;
    }

    #description {
      margin-bottom : 20px;
    }
  ` ]
})
export class TalkDetailsComponent {
  talk: TalkType;
  isWatched: boolean;

  constructor(private route: ActivatedRoute, private store: Store<IAppState>) {
    store.select(s => s.talks)
      .subscribe(talks => {
        const id = (+route.snapshot.paramMap.get('id'));
        this.talk = talks.talks[ id ];
        this.isWatched = talks.watched[ id ];
      });
  }

  handleRate(newRating: number): void {
    this.store.dispatch(new TalksActions.RateAction({
      talkId: this.talk.id,
      rating: newRating
    }));
  }

  handleWatch(): void {
    this.store.dispatch(new TalksActions.TalkWatchedAction({
      talkId: this.talk.id,
    }));
  }
}
