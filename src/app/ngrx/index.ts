import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { TalksState } from '../talks/nrgx/talks.state';
import { type } from '../shared/services/helpers/type';
import {
  Action,
  ActionReducer,
  ActionReducerFactory,
  ActionReducerMap,
  combineReducers,
  compose
} from '@ngrx/store';
import { talksReducer } from '../talks/nrgx/talks.reducer';

export namespace AppActions {
  const CATEGORY = 'App';

  export interface IActions {
    NOOP: string;
  }

  export const ActionTypes: IActions = {
    NOOP: type(`${CATEGORY} Noop`)
  };

  export class NoopAction implements Action {
    type = ActionTypes.NOOP;
    payload: string = null;
  }

  export type Actions = NoopAction;
}

/**
 * We treat each reducer like a table in a database. This means our
 * top level state interface is just a map of keys to inner state types.
 */
export interface IAppState {
  talks: TalksState.IState,
  router: RouterReducerState
}

/**
 * Because meta-reducers take a reducer function and return a new reducer,
 * we can user our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
export const AppReducers: ActionReducerMap<IAppState> = {
  talks : talksReducer,
  router: routerReducer
};

/**
 * Development console.log actions
 */
function logger(reducer: ActionReducer<IAppState>) {
  return (state: IAppState, action: any) => {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map
 * to compose the root meta-reducer.
 * To add more meta-reducers, provide a custom reducer factory.
 */
export const developmentReducerFactory: ActionReducerFactory<IAppState, Action>
  = compose(logger, combineReducers);
