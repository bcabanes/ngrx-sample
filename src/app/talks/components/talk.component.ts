import { Component, Input } from '@angular/core';

import { TalkType } from '../models/talk-type.model';

@Component({
  selector: 'app-talk',
  template: `
    <md-card>
      <div id="rating-column">
        Rating
        <span id="rating">{{talk.rating | formatRating}}</span>
      </div>

      <div>
        <span id="title"><a [routerLink]="['/talk', talk.id]">{{talk.title}}</a></span>
        <span id="speaker">{{talk.speaker}}</span>
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
  ` ]
})
export class TalkComponent {
  @Input() talk: TalkType;
}
