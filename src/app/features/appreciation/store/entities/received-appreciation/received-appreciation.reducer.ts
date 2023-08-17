import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ActionReducer, createReducer, on } from '@ngrx/store';
import { AuthActions } from 'src/app/store/app-action-types';

import * as ReceivedAppreciationActions from './received-appreciation.actions';
import { ReceivedAppreciation } from './received-appreciation.model';

export const receivedAppreciationsFeatureKey = 'receivedAppreciations';

export interface State extends EntityState<ReceivedAppreciation> {
  isListLoading: boolean;
}

export const adapter: EntityAdapter<ReceivedAppreciation> = createEntityAdapter<ReceivedAppreciation>();

export const initialState: State = adapter.getInitialState({
  isListLoading: false,
});

export const reducer = createReducer(
  initialState,
  on(
    ReceivedAppreciationActions.getReceivedAppreciationsFromDB,
    ReceivedAppreciationActions.listIsLoading,
    (state) => {
      return { ...state, isListLoading: true };
    }
  ),
  on(ReceivedAppreciationActions.listIsNotLoading, (state) => {
    return { ...state, isListLoading: false };
  }),
  on(ReceivedAppreciationActions.addReceivedAppreciation, (state, action) =>
    adapter.addOne(action.receivedAppreciation, state)
  ),
  on(ReceivedAppreciationActions.upsertReceivedAppreciation, (state, action) =>
    adapter.upsertOne(action.receivedAppreciation, state)
  ),
  on(ReceivedAppreciationActions.addReceivedAppreciations, (state, action) =>
    adapter.addMany(action.receivedAppreciations, state)
  ),
  on(ReceivedAppreciationActions.upsertReceivedAppreciations, (state, action) =>
    adapter.upsertMany(action.receivedAppreciations, state)
  ),
  on(ReceivedAppreciationActions.updateReceivedAppreciation, (state, action) =>
    adapter.updateOne(action.receivedAppreciation, state)
  ),
  on(ReceivedAppreciationActions.updateReceivedAppreciations, (state, action) =>
    adapter.updateMany(action.receivedAppreciations, state)
  ),
  on(ReceivedAppreciationActions.deleteReceivedAppreciation, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(ReceivedAppreciationActions.deleteReceivedAppreciations, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(ReceivedAppreciationActions.loadReceivedAppreciations, (state, action) =>
    adapter.setAll(action.receivedAppreciations, state)
  ),
  on(ReceivedAppreciationActions.clearReceivedAppreciations, (state) =>
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
