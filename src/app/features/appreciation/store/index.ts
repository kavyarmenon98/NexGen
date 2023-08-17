import { ActionReducerMap, createFeatureSelector, MetaReducer } from '@ngrx/store';

import * as fromDailyAppreciations from './entities/daily-appreciation/daily-appreciation.reducer';
import * as fromGivenAppreciations from './entities/given-appreciation/given-appreciation.reducer';
import * as fromReceivedAppreciations from './entities/received-appreciation/received-appreciation.reducer';

export const appreciationsFeatureKey = 'appreciations';

export interface State {
  [fromReceivedAppreciations.receivedAppreciationsFeatureKey]: fromReceivedAppreciations.State;
  [fromGivenAppreciations.givenAppreciationsFeatureKey]: fromGivenAppreciations.State;
  [fromDailyAppreciations.dailyAppreciationsFeatureKey]: fromDailyAppreciations.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromReceivedAppreciations.receivedAppreciationsFeatureKey]:
    fromReceivedAppreciations.reducer,
  [fromGivenAppreciations.givenAppreciationsFeatureKey]:
    fromGivenAppreciations.reducer,
  [fromDailyAppreciations.dailyAppreciationsFeatureKey]:
    fromDailyAppreciations.reducer,
};

export const metaReducers: MetaReducer<any>[] = [
  fromReceivedAppreciations.metaReducer,
  fromGivenAppreciations.metaReducer,
  fromDailyAppreciations.metaReducer,
];

export const selectAppreciationState = createFeatureSelector<State>(
  appreciationsFeatureKey
);
