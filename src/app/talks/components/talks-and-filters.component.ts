import { Component } from '@angular/core';
import { Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FiltersType } from '../models/filters-type.model';
import { TalkType } from '../models/talk-type.model';
import { IAppState } from '../../ngrx/index';

@Component({
  selector: 'app-cmp',
  template: `
    <app-filters [filters]="filters | async"
                 (filtersChange)="handleFiltersChange($event)"></app-filters>
    <app-talks [talks]="talks | async"></app-talks>
  `,
  styles  : [ `
    :host {
      display        : flex;
      flex-direction : column;
    }
  ` ]
})
export class TalksAndFiltersComponent {
  filters: Observable<FiltersType>;
  talks: Observable<TalkType[]>;

  constructor(private router: Router, store: Store<IAppState>) {
    this.filters = store.select('talks', 'filters');
    this.talks = store.select(s => s.talks)
      .map(talks => talks.list.map(n => talks.talks[ n ]));
  }

  handleFiltersChange(filters: FiltersType): void {
    this.router.navigate([ '/talks', this.createParams(filters) ]);
  }

  private createParams(filters: FiltersType): Params {
    const updatedFilters: any = {};
    if (filters.speaker) {
      updatedFilters.speaker = filters.speaker;
    }
    if (filters.title) {
      updatedFilters.title = filters.title;
    }
    if (filters.minRating) {
      updatedFilters.minRating = filters.minRating;
    }
    return updatedFilters;
  }
}
