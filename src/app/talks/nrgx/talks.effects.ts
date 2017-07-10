import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Params } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import { AppActions, IAppState } from '../../ngrx/index';
import { TalksActions } from './talks.action';
import { FiltersType } from '../models/filters-type.model';
import { TalksService } from '../talks.service';
import { WatchService } from '../watch.service';

@Injectable()
export class TalksEffects {

  @Effect() navigateToTalks$: Observable<Action> =
              this.handleNavigation('talks', (route: ActivatedRouteSnapshot) => {
                const filters = this.createFilters(route.params);
                return this.talksService.findTalks(filters)
                  .map(data => new TalksActions.TalksUpdatedAction({ ...data }))
                  .do(_ => new TalksActions.FiltersUpdated(filters));
              });

  @Effect() navigateToTalk$: Observable<Action> =
              this.handleNavigation('talk/:id', (route: ActivatedRouteSnapshot, state: IAppState) => {
                const id = +route.paramMap.get('id');
                if (!state.talks[ id ]) {
                  return this.talksService.findTalk(+route.paramMap.get('id'))
                    .map(talk => new TalksActions.TalkUpdatedAction(talk));
                }
                return of(new AppActions.NoopAction());
              });

  @Effect() rateTalk$: Observable<Action> = this.actions$
    .ofType(TalksActions.ActionTypes.RATE)
    .switchMap((a: TalksActions.RateAction) => {
      return this.talksService.rateTalk(a.payload.talkId, a.payload.rating)
        .switchMap(() => of())
        .catch(e => {
          console.log('Error', e);
          return of(new TalksActions.RemoveRateAction({ talkId: a.payload.talkId }));
        });
    });

  @Effect() watchTalk: Observable<Action> = this.actions$
    .ofType(TalksActions.ActionTypes.WATCH)
    .map((a: TalksActions.WatchAction) => {
      this.watchService.watch(a.payload.talkId);
      return new TalksActions.TalkWatchedAction(a.payload);
    });

  constructor(private actions$: Actions,
              private store: Store<IAppState>,
              private talksService: TalksService,
              private watchService: WatchService) {
  }

  private handleNavigation(segment: string, callback: (a: ActivatedRouteSnapshot, state: IAppState) => Observable<any>) {
    const nav = this.actions$.ofType(ROUTER_NAVIGATION)
      .map((route: RouterNavigationAction) => route.payload.routerState.root.firstChild)
      .filter(s => s.routeConfig.path === segment);

    return nav.withLatestFrom(this.store)
      .switchMap(a => callback(a[ 0 ], a[ 1 ]))
      .catch(e => {
        console.log('Network error', e);
        return of(new AppActions.NoopAction());
      });
  }

  private createFilters(params: Params): FiltersType {
    return {
      speaker  : params[ 'speaker' ] || null,
      title    : params[ 'title' ] || null,
      minRating: params[ 'minRating' ] ? +params[ 'minRating' ] : 0
    };
  }
}
