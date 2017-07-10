import { FiltersType, TalkType } from '../models';

export namespace TalksState {
  export interface IState {
    talks: { [ id: number ]: TalkType };
    list: number[];
    filters: FiltersType;
    watched: { [id: number]: boolean };
    errors?: Array<any>;
  }

  export const intialState: IState = {
    filters: { speaker: '', title: '', minRating: 0 },
    talks: {},
    list: [],
    watched: {}
  }
}
