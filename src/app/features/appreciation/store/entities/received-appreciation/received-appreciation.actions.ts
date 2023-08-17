import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { ReceivedAppreciation } from './received-appreciation.model';

export const listIsLoading = createAction(
  '[ReceivedAppreciation/API] Set listLoading to true'
);

export const listIsNotLoading = createAction(
  '[ReceivedAppreciation/API] Set listLoading to false'
);

export const getReceivedAppreciationsFromDB = createAction(
  '[ReceivedAppreciation/API] Get ReceivedAppreciations from DB'
);

export const loadReceivedAppreciations = createAction(
  '[ReceivedAppreciation/API] Load ReceivedAppreciations',
  props<{ receivedAppreciations: ReceivedAppreciation[] }>()
);

export const addReceivedAppreciation = createAction(
  '[ReceivedAppreciation/API] Add ReceivedAppreciation',
  props<{ receivedAppreciation: ReceivedAppreciation }>()
);

export const upsertReceivedAppreciation = createAction(
  '[ReceivedAppreciation/API] Upsert ReceivedAppreciation',
  props<{ receivedAppreciation: ReceivedAppreciation }>()
);

export const addReceivedAppreciations = createAction(
  '[ReceivedAppreciation/API] Add ReceivedAppreciations',
  props<{ receivedAppreciations: ReceivedAppreciation[] }>()
);

export const upsertReceivedAppreciations = createAction(
  '[ReceivedAppreciation/API] Upsert ReceivedAppreciations',
  props<{ receivedAppreciations: ReceivedAppreciation[] }>()
);

export const updateReceivedAppreciation = createAction(
  '[ReceivedAppreciation/API] Update ReceivedAppreciation',
  props<{ receivedAppreciation: Update<ReceivedAppreciation> }>()
);

export const updateReceivedAppreciations = createAction(
  '[ReceivedAppreciation/API] Update ReceivedAppreciations',
  props<{ receivedAppreciations: Update<ReceivedAppreciation>[] }>()
);

export const deleteReceivedAppreciation = createAction(
  '[ReceivedAppreciation/API] Delete ReceivedAppreciation',
  props<{ id: string }>()
);

export const deleteReceivedAppreciations = createAction(
  '[ReceivedAppreciation/API] Delete ReceivedAppreciations',
  props<{ ids: string[] }>()
);

export const clearReceivedAppreciations = createAction(
  '[ReceivedAppreciation/API] Clear ReceivedAppreciations'
);
