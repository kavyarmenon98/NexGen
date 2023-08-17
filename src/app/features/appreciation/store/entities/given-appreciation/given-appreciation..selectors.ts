import { createSelector } from '@ngrx/store';
import { selectAppreciationState } from 'src/app/features/appreciation/store';

import * as fromGivenAppreciation from './given-appreciation.reducer';

export const selectGivenAppreciationState = createSelector(
  selectAppreciationState,
  (state) => {
    return state.givenAppreciations;
  }
);

export const selectAllGivenAppreciations = createSelector(
  selectGivenAppreciationState,
  fromGivenAppreciation.selectAll
);

export const selectGivenAppreciationListLoading = createSelector(
  selectGivenAppreciationState,
  (state) => {
    return state.isListLoading;
  }
);

export const selectGivenAppreciationSingleLoading = createSelector(
  selectGivenAppreciationState,
  (state) => {
    return state.singleIsLoading;
  }
);

export const selectGivenAppreciationSavedSuccessfully = createSelector(
  selectGivenAppreciationState,
  (state) => {
    return state.savedSuccessfully;
  }
);
