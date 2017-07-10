import { TalksState } from './talks.state';
import { TalksActions } from './talks.action';

export function talksReducer(state: TalksState.IState = TalksState.intialState,
                             action: TalksActions.Actions) {
  switch (action.type) {
    case TalksActions.ActionTypes.API_ERROR:
      // always push latest error on top
      const errors = [
        action.payload,
        ...(state.errors || [])
      ];
      return { ...state, errors };
    case TalksActions.ActionTypes.TALKS_UPDATED: {
      return { ...state, ...action.payload };
    }
    case TalksActions.ActionTypes.FILTERS_UPDATED: {
      return { ...state, filters: action.payload };
    }
    case TalksActions.ActionTypes.TALK_UPDATED: {
      const talks = { ...state.talks };
      talks[action.payload.id] = action.payload;
      return { ...state, talks };
    }
    case TalksActions.ActionTypes.RATE: {
      const talks = { ...state.talks };
      talks[action.payload.talkId].rating = action.payload.rating;
      return { ...state, talks };
    }
    case TalksActions.ActionTypes.REMOVE_RATE: {
      const talks = { ...state.talks };
      talks[action.payload.talkId].rating = null;
      return { ...state, talks };
    }
    case TalksActions.ActionTypes.TALK_WATCHED: {
      const watched = { ...state.watched };
      watched[action.payload.talkId] = true;
      return { ...state, watched };
    }
    default:
      return state;
  }
}
