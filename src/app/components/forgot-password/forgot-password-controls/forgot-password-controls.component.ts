import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ThemeService } from 'src/app/services/theme.service';
import {
  atleastOneCapitalCharacterValidator,
} from 'src/app/shared/utils/validators/at-least-one-capital-character-required.validator';
import { atleastOneNumberValidator } from 'src/app/shared/utils/validators/at-least-one-number-required.validator';
import {
  atleastOneSpecialCharacterValidator,
} from 'src/app/shared/utils/validators/at-least-one-special-character-required.validation';
import { emailFormatValidator } from 'src/app/shared/utils/validators/email-format-required.validation';
import { noWhitespaceValidator } from 'src/app/shared/utils/validators/no-white-space.validator';
import { passwordMismatchValidator } from 'src/app/shared/utils/validators/password-mismatch.validator';
import { selectForgotPasswordComponentToShow } from 'src/app/store/selectors/forgot-password.selectors';

@Component({
  selector: 'app-forgot-password-controls',
  templateUrl: './forgot-password-controls.component.html',
  styleUrls: ['./forgot-password-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.25s cubic-bezier(.17,.67,.88,.1)', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ForgotPasswordControlsComponent {
  @Input() passwordForm: FormGroup;
  @Input() emailForm: FormGroup;
  @Input() otpForm: FormGroup;

  // Listen to Component to show changes
  componentToShow$ = this.store$.select(selectForgotPasswordComponentToShow);

  email = new FormControl({ value: '', disabled: false }, [
    Validators.required,
    noWhitespaceValidator,
    emailFormatValidator,
  ]);

  otp = new FormControl({ value: '', disabled: false }, [Validators.required]);

  newPassword = new FormControl({ value: '', disabled: false }, [
    Validators.required,
    Validators.minLength(8),
    noWhitespaceValidator,
    atleastOneCapitalCharacterValidator,
    atleastOneNumberValidator,
    atleastOneSpecialCharacterValidator,
  ]);

  confirmPassword = new FormControl({ value: '', disabled: false }, [
    Validators.required,
    passwordMismatchValidator,
  ]);

  constructor(
    public themeService: ThemeService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private store$: Store
  ) {}

  createPasswordForm() {
    const form = this.fb.group({
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword,
    });
    return form;
  }

  createEmailForm() {
    const form = this.fb.group({
      email: this.email,
    });
    return form;
  }

  createOTPForm() {
    const form = this.fb.group({
      otp: this.otp,
    });
    return form;
  }

  returnPasswordValues() {
    if (
      this.passwordForm.get('newPassword').value !=
      this.passwordForm.get('confirmPassword').value
    ) {
      return;
    }
    if (!this.passwordForm.valid) {
      this.passwordForm.markAllAsTouched();
      this.cdr.detectChanges();

      return;
    }
    return this.passwordForm;
  }

  returnEmailValue() {
    if (!this.emailForm.valid) {
      this.emailForm.markAllAsTouched();
      this.cdr.detectChanges();
      return;
    }
    return this.emailForm;
  }

  returnOTPValues() {
    if (!this.otpForm.valid) {
      this.otpForm.markAllAsTouched();
      this.cdr.detectChanges();
      return;
    }
    return this.otpForm;
  }
}
