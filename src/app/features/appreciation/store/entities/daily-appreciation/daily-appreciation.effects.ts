import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { DailyAppreciationActions } from 'src/app/features/appreciation/store/appreciation-action-types';
import { DailyAppreciation } from 'src/app/features/appreciation/store/entities/daily-appreciation/daily-appreciation.model';
import { AppreciationService } from 'src/app/services/appreciation.service';
import { CommonErrorHandler } from 'src/app/services/common-error-handler.service';
import * as uuid from 'uuid';

@Injectable()
export class DailyAppreciationEffects {
  getDailyAppreciationsFromDB$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DailyAppreciationActions.getDailyAppreciation),

      mergeMap(() =>
        this.appreciationService.getDailyAppreciation().pipe(
          switchMap((response: any) => {
            const toReturn: DailyAppreciation[] = [];
            if (response) {
              response.forEach((item) => {
                item['id'] = uuid.v4();
                toReturn.push(item);
              });
            }
            return [
              toReturn.length > 0
                ? DailyAppreciationActions.loadDailyAppreciations({
                    dailyAppreciations: toReturn,
                  })
                : DailyAppreciationActions.clearDailyAppreciations(),

              DailyAppreciationActions.listIsNotLoading(),
            ];
          }),

          catchError((error) => {
            this.errorHandler.handleError(error);
            return [DailyAppreciationActions.listIsNotLoading()];
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private appreciationService: AppreciationService,
    private errorHandler: CommonErrorHandler
  ) {}
}
