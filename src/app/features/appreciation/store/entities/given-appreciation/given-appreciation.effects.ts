import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DateTime } from 'luxon';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { GivenAppreciationActions } from 'src/app/features/appreciation/store/appreciation-action-types';
import { GivenAppreciation } from 'src/app/features/appreciation/store/entities/given-appreciation/given-appreciation.model';
import { SnackbarType } from 'src/app/models/ui.model';
import { AppreciationService } from 'src/app/services/appreciation.service';
import { CommonErrorHandler } from 'src/app/services/common-error-handler.service';
import { UIService } from 'src/app/services/ui.service';
import * as uuid from 'uuid';

@Injectable()
export class GivenAppreciationEffects {
  getGivenAppreciationsFromDB$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GivenAppreciationActions.getGivenAppreciationsFromDB),

      mergeMap(() =>
        this.appreciationService.getTotalAppreciationGiven().pipe(
          switchMap((response: any) => {
            const toReturn: GivenAppreciation[] = [];
            if (response && response.elements) {
              response.elements.forEach((item) => {
                item['id'] = uuid.v4();
                item['type'] = item.type + '';
                item['createdDate'] = DateTime.fromJSDate(
                  new Date(item.createdDate)
                ).toFormat('dd-MM-yyyy');
                item['respondedDate'] = DateTime.fromJSDate(
                  new Date(item.respondedDate)
                ).toFormat('dd-MM-yyyy');
                toReturn.push(item);
              });
            }
            return [
              toReturn.length > 0
                ? GivenAppreciationActions.loadGivenAppreciations({
                    givenAppreciations: toReturn,
                  })
                : GivenAppreciationActions.clearGivenAppreciations(),

              GivenAppreciationActions.listIsNotLoading(),
            ];
          }),

          catchError((error) => {
            this.errorHandler.handleError(error);
            return [GivenAppreciationActions.listIsNotLoading()];
          })
        )
      )
    );
  });

  sendAppreciation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GivenAppreciationActions.sendAppreciation),
      mergeMap((action) =>
        this.appreciationService.sendAppreciation(action.params).pipe(
          switchMap(() => {
            this.uiService.showSnackBar(
              'Sent Successfully',
              SnackbarType.success
            );
            return [
              GivenAppreciationActions.getGivenAppreciationsFromDB(),
              GivenAppreciationActions.setSavedSuccessfullyFlag(),
              GivenAppreciationActions.singleIsNotLoading(),
            ];
          }),

          catchError((error) => {
            this.errorHandler.handleError(error);
            return [
              GivenAppreciationActions.singleIsNotLoading(),
              GivenAppreciationActions.listIsNotLoading(),
            ];
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,

    private uiService: UIService,

    private appreciationService: AppreciationService,

    private errorHandler: CommonErrorHandler
  ) {}
}
