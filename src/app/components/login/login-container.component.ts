import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommonStatic } from 'src/app/shared/utils/common-static';

@UntilDestroy()
@Component({
  selector: 'auth-login',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss'],
})
export class LoginContainerComponent implements OnInit {
  isLarge = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('TIME - Login');
    this.breakpointObserver
      .observe(['(min-width: 769px)'])
      .pipe(untilDestroyed(this))
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isLarge = true;
        } else {
          this.isLarge = false;
        }
      });
  }

  ngOnInit(): void {
    const id = CommonStatic.getUserId();
    if (id) {
      this.router.navigate(['home']);
    }
  }
}
