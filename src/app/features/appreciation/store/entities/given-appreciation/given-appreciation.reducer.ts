import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ActionReducer, createReducer, on } from '@ngrx/store';
import { AuthActions } from 'src/app/store/app-action-types';

import * as GivenAppreciationActions from './given-appreciation.actions';
import { GivenAppreciation } from './given-appreciation.model';

export const givenAppreciationsFeatureKey = 'givenAppreciations';

export interface State extends EntityState<GivenAppreciation> {
  isListLoading: boolean;
  singleIsLoading: boolean;
  savedSuccessfully: boolean;
}

export const adapter: EntityAdapter<GivenAppreciation> = createEntityAdapter<GivenAppreciation>();

export const initialState: State = adapter.getInitialState({
  isListLoading: false,
  singleIsLoading: false,
  savedSuccessfully: false,
});

export const reducer = createReducer(
  initialState,
  on(
    GivenAppreciationActions.sendAppreciation,
    GivenAppreciationActions.singleIsLoading,
    (state) => {
      return { ...state, singleIsLoading: true };
    }
  ),
  on(
    GivenAppreciationActions.sendAppreciation,
    GivenAppreciationActions.singleIsLoading,
    (state) => {
      return { ...state, singleIsLoading: true };
    }
  ),
  on(GivenAppreciationActions.singleIsNotLoading, (state) => {
    return { ...state, singleIsLoading: false };
  }),
  on(GivenAppreciationActions.setSavedSuccessfullyFlag, (state) => {
    return { ...state, savedSuccessfully: true };
  }),
  on(GivenAppreciationActions.clearSavedSuccessfullyFlag, (state) => {
    return { ...state, savedSuccessfully: false };
  }),
  on(
    GivenAppreciationActions.getGivenAppreciationsFromDB,
    GivenAppreciationActions.listIsLoading,
    (state) => {
      return { ...state, isListLoading: true };
    }
  ),
  on(GivenAppreciationActions.listIsNotLoading, (state) => {
    return { ...state, isListLoading: false };
  }),
  on(GivenAppreciationActions.addGivenAppreciation, (state, action) =>
    adapter.addOne(action.givenAppreciation, state)
  ),
  on(GivenAppreciationActions.upsertGivenAppreciation, (state, action) =>
    adapter.upsertOne(action.givenAppreciation, state)
  ),
  on(GivenAppreciationActions.addGivenAppreciations, (state, action) =>
    adapter.addMany(action.givenAppreciations, state)
  ),
  on(GivenAppreciationActions.upsertGivenAppreciations, (state, action) =>
    adapter.upsertMany(action.givenAppreciations, state)
  ),
  on(GivenAppreciationActions.updateGivenAppreciation, (state, action) =>
    adapter.updateOne(action.givenAppreciation, state)
  ),
  on(GivenAppreciationActions.updateGivenAppreciations, (state, action) =>
    adapter.updateMany(action.givenAppreciations, state)
  ),
  on(GivenAppreciationActions.deleteGivenAppreciation, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(GivenAppreciationActions.deleteGivenAppreciations, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(GivenAppreciationActions.loadGivenAppreciations, (state, action) =>
    adapter.setAll(action.givenAppreciations, state)
  ),
  on(GivenAppreciationActions.clearGivenAppreciations, (state) =>
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
