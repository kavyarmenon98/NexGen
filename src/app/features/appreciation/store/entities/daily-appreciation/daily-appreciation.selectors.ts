import { createSelector } from '@ngrx/store';
import { selectAppreciationState } from 'src/app/features/appreciation/store';

import * as fromDailyAppreciation from './daily-appreciation.reducer';

export const selectDailyAppreciationState = createSelector(
  selectAppreciationState,
  (state) => {
    return state.dailyAppreciations;
  }
);

export const selectAllDailyAppreciations = createSelector(
  selectDailyAppreciationState,
  fromDailyAppreciation.selectAll
);

export const selectDailyAppreciationListLoading = createSelector(
  selectDailyAppreciationState,
  (state) => {
    return state.isListLoading;
  }
);
