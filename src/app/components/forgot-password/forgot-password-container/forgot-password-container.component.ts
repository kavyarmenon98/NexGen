import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { ThemeService } from 'src/app/services/theme.service';
import { ForgotPasswordActions, UIActions } from 'src/app/store/app-action-types';
import {
  selectForgotPasswordComponentToShow,
  selectForgotPasswordIsLoading,
  selectForgotPasswordOTP,
} from 'src/app/store/selectors/forgot-password.selectors';

import { ForgotPasswordControlsComponent } from '../forgot-password-controls/forgot-password-controls.component';

@Component({
  selector: 'app-forgot-password-container',
  templateUrl: './forgot-password-container.component.html',
  styleUrls: ['./forgot-password-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordContainerComponent implements OnInit, OnDestroy {
  title = 'Reset Password';
  // Listen to Component to show changes
  componentToShow$ = this.store$.select(selectForgotPasswordComponentToShow);
  isLoading$ = this.store$.select(selectForgotPasswordIsLoading);

  @ViewChild(ForgotPasswordControlsComponent, {
    static: true,
  })
  forgotPasswordControlsComponent: ForgotPasswordControlsComponent;
  passwordForm: FormGroup;
  emailForm: FormGroup;
  otpForm: FormGroup;

  constructor(public themeService: ThemeService, private store$: Store) {}

  ngOnInit(): void {
    this.passwordForm = this.forgotPasswordControlsComponent.createPasswordForm();
    this.emailForm = this.forgotPasswordControlsComponent.createEmailForm();
    this.otpForm = this.forgotPasswordControlsComponent.createOTPForm();
  }

  requestOtp() {
    const fg = this.forgotPasswordControlsComponent.returnEmailValue();
    if (!fg || fg.invalid) {
      return;
    }

    const email: string = fg.get('email').value;

    // Dispatch RessetPasswordRequest Action

    this.store$.dispatch(ForgotPasswordActions.isLoading());

    this.store$.dispatch(
      ForgotPasswordActions.resetPasswordRequest({
        email: email.trim(),
      })
    );
  }

  verifyOtp() {
    const fg = this.forgotPasswordControlsComponent.returnOTPValues();
    if (fg.invalid) {
      return;
    }

    const otp: string = fg.get('otp').value;

    this.store$.dispatch(
      ForgotPasswordActions.saveOTP({
        otp: otp.trim(),
      })
    );

    this.store$.dispatch(ForgotPasswordActions.isLoading());

    this.store$
      .pipe(select(selectForgotPasswordOTP), take(1))
      .subscribe((otpValue) => {
        this.store$.dispatch(
          ForgotPasswordActions.verifyOTP({
            otp: otpValue,
          })
        );
      });
  }
  resetPassword() {
    const fg = this.forgotPasswordControlsComponent.returnPasswordValues();

    if (fg.invalid) {
      return;
    }

    const newPassword: string = fg.get('newPassword').value;
    const confirmPassword: string = fg.get('confirmPassword').value;

    this.store$.dispatch(ForgotPasswordActions.isLoading());

    this.store$
      .pipe(select(selectForgotPasswordOTP), take(1))
      .subscribe((otpValue) => {
        this.store$.dispatch(
          ForgotPasswordActions.resetPassword({
            otp: otpValue,
            confirmPassword: confirmPassword.trim(),
            newPassword: newPassword.trim(),
          })
        );
      });
  }
  backToSingIn() {
    this.store$.dispatch(
      UIActions.navigate({
        url: '/',
      })
    );
  }

  ngOnDestroy() {
    this.store$.dispatch(ForgotPasswordActions.isNotLoading());
    this.store$.dispatch(ForgotPasswordActions.showEmailComponent());
    this.store$.dispatch(ForgotPasswordActions.clearOTP());
  }
}
