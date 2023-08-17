import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BearerTokenInterceptor } from 'src/app/interceptors/bearer-token.interceptor';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppUIEffects } from 'src/app/store/effects/app-ui-.effects';
import { AuditEffects } from 'src/app/store/effects/audit.effects';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  ForgotPasswordContainerComponent,
} from './components/forgot-password/forgot-password-container/forgot-password-container.component';
import {
  ForgotPasswordControlsComponent,
} from './components/forgot-password/forgot-password-controls/forgot-password-controls.component';
import {
  ForgotPasswordHeaderComponent,
} from './components/forgot-password/forgot-password-header/forgot-password-header.component';
import { LoginContainerComponent } from './components/login/login-container.component';
import { LoginFormControlsComponent } from './components/login/login-form-controls/login-form-controls.component';
import * as fromApp from './store';
import { AuthEffects } from './store/effects/auth.effects';
import { ForgotPasswordEffects } from './store/effects/forgot-password.effects';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};
@NgModule({
  declarations: [
    AppComponent,
    LoginContainerComponent,
    LoginFormControlsComponent,
    ForgotPasswordContainerComponent,
    ForgotPasswordHeaderComponent,
    ForgotPasswordControlsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    NgCircleProgressModule.forRoot({}),
    KeyboardShortcutsModule.forRoot(),
    SharedModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([
      AuthEffects,
      AppUIEffects,
      ForgotPasswordEffects,
      AuditEffects,
    ]),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(fromApp.reducers, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictActionTypeUniqueness: true,
        strictActionWithinNgZone: true,
        strictStateImmutability: true,
      },
    }),
    StoreRouterConnectingModule.forRoot(),

    !environment.production ? StoreDevtoolsModule.instrument() : [],

    PerfectScrollbarModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],

  exports: [NgCircleProgressModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BearerTokenInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
