import { Component, Input, EventEmitter, Output } from '@angular/core';

import { TalkType } from '../models/talk-type.model';

@Component({
  selector: 'app-rate-button',
  template: `
    <button md-raised-button
            (click)="promptRating()"
            [disabled]="talk.yourRating">Rate
    </button>
  `
})
export class RateButtonComponent {
  @Input() talk: TalkType;
  @Output() rate = new EventEmitter();

  promptRating(): void {
    const value = prompt('Enter rating');
    if (value) {
      this.rate.next(+value);
    }
  }
}
