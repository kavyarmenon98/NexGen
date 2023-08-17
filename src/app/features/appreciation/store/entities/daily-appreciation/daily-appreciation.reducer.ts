import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ActionReducer, createReducer, on } from '@ngrx/store';
import { AuthActions } from 'src/app/store/app-action-types';

import * as DailyAppreciationActions from './daily-appreciation.actions';
import { DailyAppreciation } from './daily-appreciation.model';

export const dailyAppreciationsFeatureKey = 'dailyAppreciations';

export interface State extends EntityState<DailyAppreciation> {
  isListLoading: boolean;
}

export const adapter: EntityAdapter<DailyAppreciation> = createEntityAdapter<DailyAppreciation>();

export const initialState: State = adapter.getInitialState({
  isListLoading: false,
});

export const reducer = createReducer(
  initialState,
  on(
    DailyAppreciationActions.getDailyAppreciation,
    DailyAppreciationActions.listIsLoading,
    (state) => {
      return { ...state, isListLoading: true };
    }
  ),
  on(DailyAppreciationActions.listIsNotLoading, (state) => {
    return { ...state, isListLoading: false };
  }),
  on(DailyAppreciationActions.addDailyAppreciation, (state, action) =>
    adapter.addOne(action.dailyAppreciation, state)
  ),
  on(DailyAppreciationActions.upsertDailyAppreciation, (state, action) =>
    adapter.upsertOne(action.dailyAppreciation, state)
  ),
  on(DailyAppreciationActions.addDailyAppreciations, (state, action) =>
    adapter.addMany(action.dailyAppreciations, state)
  ),
  on(DailyAppreciationActions.upsertDailyAppreciations, (state, action) =>
    adapter.upsertMany(action.dailyAppreciations, state)
  ),
  on(DailyAppreciationActions.updateDailyAppreciation, (state, action) =>
    adapter.updateOne(action.dailyAppreciation, state)
  ),
  on(DailyAppreciationActions.updateDailyAppreciations, (state, action) =>
    adapter.updateMany(action.dailyAppreciations, state)
  ),
  on(DailyAppreciationActions.deleteDailyAppreciation, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(DailyAppreciationActions.deleteDailyAppreciations, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(DailyAppreciationActions.loadDailyAppreciations, (state, action) =>
    adapter.setAll(action.dailyAppreciations, state)
  ),
  on(DailyAppreciationActions.clearDailyAppreciations, (state) =>
    adapter.removeAll(state)
  )
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export function metaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action.type === AuthActions.logout.type) {
      return reducer(undefined, action);
    }
    return reducer(state, action);
  };
}
