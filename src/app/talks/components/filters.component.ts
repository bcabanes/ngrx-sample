import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { FiltersType } from '../models/filters-type.model';

@Component({
  selector: 'app-filters',
  template: `
    <div [formGroup]="filtersForm">
      <md-input-container>
        <input mdInput formControlName="title" placeholder="Title">
      </md-input-container>

      <md-input-container>
        <input mdInput formControlName="speaker" placeholder="Speaker">
      </md-input-container>

      <md-checkbox formControlName="highRating">
        High Rating
      </md-checkbox>
    </div>
  `
})
export class FiltersComponent {
  @Input()
  set filters(v) {
    this.filtersForm.setValue({
      title     : v.title,
      speaker   : v.speaker,
      highRating: v.minRating >= 9
    }, { emitEvent: false });
  }

  @Output() filtersChange = new EventEmitter();

  filtersForm = new FormGroup({
    speaker   : new FormControl(),
    title     : new FormControl(),
    highRating: new FormControl(false),
  });

  constructor() {
    this.filtersForm.valueChanges.debounceTime(200)
      .subscribe(value => this.filtersChange.next(this.createFiltersObject(value)));
  }

  private createFiltersObject({ title, speaker, highRating }: { title: string, speaker: string, highRating: false }): FiltersType {
    const minRating = highRating ? 9 : 0;
    return {
      speaker: speaker || null,
      title  : title || null,
      minRating
    };
  }
}
