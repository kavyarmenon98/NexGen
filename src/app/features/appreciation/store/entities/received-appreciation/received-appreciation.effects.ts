import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DateTime } from 'luxon';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ReceivedAppreciationActions } from 'src/app/features/appreciation/store/appreciation-action-types';
import {
  ReceivedAppreciation,
} from 'src/app/features/appreciation/store/entities/received-appreciation/received-appreciation.model';
import { AppreciationService } from 'src/app/services/appreciation.service';
import { CommonErrorHandler } from 'src/app/services/common-error-handler.service';
import * as uuid from 'uuid';

@Injectable()
export class ReceivedAppreciationEffects {
  getReceivedAppreciationsFromDB$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReceivedAppreciationActions.getReceivedAppreciationsFromDB),

      mergeMap(() =>
        this.appreciationService.getTotalAppreciationReceived().pipe(
          switchMap((response: any) => {
            const toReturn: ReceivedAppreciation[] = [];
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
                ? ReceivedAppreciationActions.loadReceivedAppreciations({
                    receivedAppreciations: toReturn,
                  })
                : ReceivedAppreciationActions.clearReceivedAppreciations(),

              ReceivedAppreciationActions.listIsNotLoading(),
            ];
          }),

          catchError((error) => {
            this.errorHandler.handleError(error);
            return [ReceivedAppreciationActions.listIsNotLoading()];
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
