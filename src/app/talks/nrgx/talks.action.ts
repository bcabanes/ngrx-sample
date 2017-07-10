import { Action } from '@ngrx/store';
import { RouterAction } from '@ngrx/router-store';

import { type } from '../../shared/services/helpers/type';
import { TalkType } from '../models/talk-type.model';
import { FiltersType } from '../models/filters-type.model';
import { TalksState } from './talks.state';

export namespace TalksActions {
  const CATEGORY = 'Talks';

  export interface IActions {
    API_ERROR: string;
    FILTERS_UPDATED: string;
    RATE: string;
    REMOVE_RATE: string;
    TALK_UPDATED: string;
    TALK_WATCHED: string;
    TALKS_UPDATED: string;
    WATCH: string;
  }

  export const ActionTypes: IActions = {
    API_ERROR      : type(`[${CATEGORY}] Api error`),
    FILTERS_UPDATED: type(`[${CATEGORY}] Filters updated`),
    RATE           : type(`[${CATEGORY}] Rate`),
    REMOVE_RATE    : type(`[${CATEGORY}] Remove rate`),
    TALK_UPDATED   : type(`[${CATEGORY}] Talk updated`),
    TALK_WATCHED   : type(`[${CATEGORY}] Talk watched`),
    TALKS_UPDATED  : type(`[${CATEGORY}] Talks updated`),
    WATCH          : type(`[${CATEGORY}] Watch`)
  };

  export class ApiErrorAction implements Action {
    type = ActionTypes.API_ERROR;

    /**
     * @param payload error
     */
    constructor(public payload: any) {
    }
  }

  export class FiltersUpdated implements Action {
    type = ActionTypes.FILTERS_UPDATED;

    /**
     * @param {FiltersType} payload
     */
    constructor(public payload: FiltersType) {
    }
  }

  export class RateAction implements Action {
    type = ActionTypes.RATE;

    /**
     * @params {{talkId: number, rating: number}} payload
     */
    constructor(public payload: { talkId: number, rating: number }) {
    }
  }

  export class RemoveRateAction implements Action {
    type = ActionTypes.REMOVE_RATE;

    /**
     * @param {{talkId: number}} payload
     */
    constructor(public payload: { talkId: number }) {
    }
  }

  export class TalkUpdatedAction implements Action {
    type = ActionTypes.TALK_UPDATED;

    /**
     * @param {TalkType} payload
     */
    constructor(public payload: TalkType) {
    }
  }

  export class TalkWatchedAction implements Action {
    type = ActionTypes.TALK_WATCHED;

    /**
     * @param {{talkId: number}} payload
     */
    constructor(public payload: { talkId: number }) {
    }
  }

  export class TalksUpdatedAction implements Action {
    type = ActionTypes.TALKS_UPDATED;

    /**
     *
     * @param payload talks and list
     */
    constructor(public payload: { talks: { [id: number]: TalkType}, list: number[] } ) {
    }
  }

  export class WatchAction implements Action {
    type = ActionTypes.WATCH;

    /**
     * @param {{talkId: number}} payload
     */
    constructor(public payload: { talkId: number }) {
    }
  }

  export type Actions = ApiErrorAction
    | RouterAction<TalksState.IState>
    | FiltersUpdated
    | RateAction
    | TalkUpdatedAction
    | TalkWatchedAction
    | TalksUpdatedAction
    | RemoveRateAction
    | WatchAction;
}
