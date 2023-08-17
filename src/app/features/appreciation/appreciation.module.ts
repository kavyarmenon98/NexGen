import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppreciationRoutingModule } from 'src/app/features/appreciation/appreciation-routing.module';
import {
  AppreciationContainerComponent,
} from 'src/app/features/appreciation/components/appreciation-container/appreciation-container.component';
import {
  NewAppreciationComponent,
} from 'src/app/features/appreciation/components/new-appreciation/new-appreciation.component';
import {
  DailyAppreciationEffects,
} from 'src/app/features/appreciation/store/entities/daily-appreciation/daily-appreciation.effects';
import {
  GivenAppreciationEffects,
} from 'src/app/features/appreciation/store/entities/given-appreciation/given-appreciation.effects';
import {
  ReceivedAppreciationEffects,
} from 'src/app/features/appreciation/store/entities/received-appreciation/received-appreciation.effects';
import { SharedModule } from 'src/app/shared/shared.module';

import * as fromAppreciation from './store';

const exportImport = [MatSidenavModule, MatRadioModule];

@NgModule({
  declarations: [AppreciationContainerComponent, NewAppreciationComponent],
  imports: [
    CommonModule,
    SharedModule,
    exportImport,
    AppreciationRoutingModule,
    StoreModule.forFeature(
      fromAppreciation.appreciationsFeatureKey,
      fromAppreciation.reducers,
      {
        metaReducers: fromAppreciation.metaReducers,
      }
    ),
    EffectsModule.forFeature([
      GivenAppreciationEffects,
      ReceivedAppreciationEffects,
      DailyAppreciationEffects,
    ]),
  ],
  exports: [
    AppreciationContainerComponent,
    NewAppreciationComponent,
    exportImport,
  ],
})
export class AppreciationModule {}
