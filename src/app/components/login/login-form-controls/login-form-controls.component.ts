import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MenuItemActions } from 'src/app/features/home/store/home-action-types';
import { CommonErrorHandler } from 'src/app/services/common-error-handler.service';
import { ThemeService } from 'src/app/services/theme.service';
import { CommonStatic } from 'src/app/shared/utils/common-static';
import { AuthActions } from 'src/app/store/app-action-types';
import { selectUserLoggingIn } from 'src/app/store/selectors/auth.selectors';

import { noWhitespaceValidator } from '../../../shared/utils/validators/no-white-space.validator';

@Component({
  selector: 'auth-login-form-controls',
  templateUrl: './login-form-controls.component.html',
  styleUrls: ['./login-form-controls.component.scss'],
})
export class LoginFormControlsComponent implements OnInit {
  // Flag to check whether form was submitted atleast once
  submitted = false;
  showPassword = false;
  loginForm: FormGroup;
  loading$: Observable<boolean>;

  username = new FormControl({ value: '', disabled: false }, [
    Validators.required,
    Validators.maxLength(50),
    noWhitespaceValidator,
  ]);

  password = new FormControl({ value: '', disabled: false }, [
    Validators.required,
    noWhitespaceValidator,
  ]);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public themeService: ThemeService,
    private snackbar: MatSnackBar,
    private store$: Store
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.username,
      password: this.password,
    });

    this.loading$ = this.store$.select(selectUserLoggingIn);
  }

  login() {
    if (this.loginForm.valid === false) {
      return;
    }

    this.store$.dispatch(MenuItemActions.clearMenuItems());
    this.store$.dispatch(AuthActions.isLoggingIn());

    // Clear Token
    CommonStatic.clearStorage();

    this.store$.dispatch(
      AuthActions.login({
        username: this.username.value,
        password: this.password.value,
      })
    );
  }

  getErrorMessage(control: FormControl) {
    CommonErrorHandler.getErrorMessage(control);
  }

  forgotPassword() {
    this.router.navigate(['forgot-password']);
  }

  showSnackBar(message: string, className: string) {
    this.snackbar.open(message, null, {
      duration: 2000,
      panelClass: className,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
