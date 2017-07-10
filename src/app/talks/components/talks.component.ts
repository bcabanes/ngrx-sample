import { Component, Input } from '@angular/core';

import { TalkType } from '../models/talk-type.model';

@Component({
  selector: 'app-talks',
  template: `
    <app-talk *ngFor="let t of talks" [talk]="t"></app-talk>
  `,
  styles  : [ `
    :host {
      display        : flex;
      flex-direction : column;
    }
  ` ]
})
export class TalksComponent {
  @Input() talks: TalkType[];
}
