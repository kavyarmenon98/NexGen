import { createSelector } from '@ngrx/store';
import { selectAppreciationState } from 'src/app/features/appreciation/store';

import * as fromReceivedAppreciation from './received-appreciation.reducer';

export const selectReceivedAppreciationState = createSelector(
  selectAppreciationState,
  (state) => {
    return state.receivedAppreciations;
  }
);

export const selectAllReceivedAppreciations = createSelector(
  selectReceivedAppreciationState,
  fromReceivedAppreciation.selectAll
);

export const selectReceivedAppreciationListLoading = createSelector(
  selectReceivedAppreciationState,
  (state) => {
    return state.isListLoading;
  }
);
