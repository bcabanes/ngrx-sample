import { Component, Input, EventEmitter, Output } from '@angular/core';

import { TalkType } from '../models/talk-type.model';

@Component({
  selector: 'app-watch-button',
  template: `
    <button md-raised-button (click)="handleWatch()">
      {{watched ? 'Rewatch' : 'Watch'}}
    </button>
  `
})
export class WatchButtonComponent {
  @Input() talk: TalkType;
  @Input() watched: boolean;
  @Output() watch = new EventEmitter();

  handleWatch(): void {
    this.watch.next(null);
  }
}
