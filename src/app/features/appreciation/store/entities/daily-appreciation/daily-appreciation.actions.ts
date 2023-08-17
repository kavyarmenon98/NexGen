import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { DailyAppreciation } from './daily-appreciation.model';

export const getDailyAppreciation = createAction(
  '[DailyAppreciation/API] Gets daily appreciation from DB'
);
export const listIsLoading = createAction(
  '[DailyAppreciation/API] Set listLoading to true'
);

export const listIsNotLoading = createAction(
  '[DailyAppreciation/API] Set listLoading to false'
);

export const loadDailyAppreciations = createAction(
  '[DailyAppreciation/API] Load DailyAppreciations',
  props<{ dailyAppreciations: DailyAppreciation[] }>()
);

export const addDailyAppreciation = createAction(
  '[DailyAppreciation/API] Add DailyAppreciation',
  props<{ dailyAppreciation: DailyAppreciation }>()
);

export const upsertDailyAppreciation = createAction(
  '[DailyAppreciation/API] Upsert DailyAppreciation',
  props<{ dailyAppreciation: DailyAppreciation }>()
);

export const addDailyAppreciations = createAction(
  '[DailyAppreciation/API] Add DailyAppreciations',
  props<{ dailyAppreciations: DailyAppreciation[] }>()
);

export const upsertDailyAppreciations = createAction(
  '[DailyAppreciation/API] Upsert DailyAppreciations',
  props<{ dailyAppreciations: DailyAppreciation[] }>()
);

export const updateDailyAppreciation = createAction(
  '[DailyAppreciation/API] Update DailyAppreciation',
  props<{ dailyAppreciation: Update<DailyAppreciation> }>()
);

export const updateDailyAppreciations = createAction(
  '[DailyAppreciation/API] Update DailyAppreciations',
  props<{ dailyAppreciations: Update<DailyAppreciation>[] }>()
);

export const deleteDailyAppreciation = createAction(
  '[DailyAppreciation/API] Delete DailyAppreciation',
  props<{ id: string }>()
);

export const deleteDailyAppreciations = createAction(
  '[DailyAppreciation/API] Delete DailyAppreciations',
  props<{ ids: string[] }>()
);

export const clearDailyAppreciations = createAction(
  '[DailyAppreciation/API] Clear DailyAppreciations'
);
