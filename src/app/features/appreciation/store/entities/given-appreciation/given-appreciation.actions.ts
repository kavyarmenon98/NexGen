import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { GivenAppreciation } from './given-appreciation.model';

export const sendAppreciation = createAction(
  '[GivenAppreciation/API] Send appreciation',
  props<{
    params: any;
  }>()
);

export const setSavedSuccessfullyFlag = createAction(
  '[GivenAppreciation/API] Sets saved successfully flag'
);
export const clearSavedSuccessfullyFlag = createAction(
  '[GivenAppreciation/API] Clears saved successfully flag'
);

export const singleIsLoading = createAction(
  '[GivenAppreciation/API] Set singleLoading to true'
);

export const singleIsNotLoading = createAction(
  '[GivenAppreciation/API] Set singleLoading to false'
);
export const listIsLoading = createAction(
  '[GivenAppreciation/API] Set listLoading to true'
);

export const listIsNotLoading = createAction(
  '[GivenAppreciation/API] Set listLoading to false'
);

export const getGivenAppreciationsFromDB = createAction(
  '[GivenAppreciation/API] Get GivenAppreciations from DB'
);

export const loadGivenAppreciations = createAction(
  '[GivenAppreciation/API] Load GivenAppreciations',
  props<{ givenAppreciations: GivenAppreciation[] }>()
);

export const addGivenAppreciation = createAction(
  '[GivenAppreciation/API] Add GivenAppreciation',
  props<{ givenAppreciation: GivenAppreciation }>()
);

export const upsertGivenAppreciation = createAction(
  '[GivenAppreciation/API] Upsert GivenAppreciation',
  props<{ givenAppreciation: GivenAppreciation }>()
);

export const addGivenAppreciations = createAction(
  '[GivenAppreciation/API] Add GivenAppreciations',
  props<{ givenAppreciations: GivenAppreciation[] }>()
);

export const upsertGivenAppreciations = createAction(
  '[GivenAppreciation/API] Upsert GivenAppreciations',
  props<{ givenAppreciations: GivenAppreciation[] }>()
);

export const updateGivenAppreciation = createAction(
  '[GivenAppreciation/API] Update GivenAppreciation',
  props<{ givenAppreciation: Update<GivenAppreciation> }>()
);

export const updateGivenAppreciations = createAction(
  '[GivenAppreciation/API] Update GivenAppreciations',
  props<{ givenAppreciations: Update<GivenAppreciation>[] }>()
);

export const deleteGivenAppreciation = createAction(
  '[GivenAppreciation/API] Delete GivenAppreciation',
  props<{ id: string }>()
);

export const deleteGivenAppreciations = createAction(
  '[GivenAppreciation/API] Delete GivenAppreciations',
  props<{ ids: string[] }>()
);

export const clearGivenAppreciations = createAction(
  '[GivenAppreciation/API] Clear GivenAppreciations'
);
