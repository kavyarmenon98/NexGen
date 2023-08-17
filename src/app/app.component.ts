import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { Store } from '@ngrx/store';
import { AllowIn, ShortcutInput } from 'ng-keyboard-shortcuts';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { HomeUIActions } from 'src/app/features/home/store/home-action-types';
import { SnackbarType } from 'src/app/models/ui.model';
import { ThemeService } from 'src/app/services/theme.service';
import { UIService } from 'src/app/services/ui.service';
import { CommonStatic } from 'src/app/shared/utils/common-static';
import { UIActions } from 'src/app/store/app-action-types';
import { selectInternetConnected, selectShowGlobalLoader } from 'src/app/store/selectors/app-ui.selectors';
import { environment } from 'src/environments/environment';

declare let gtag: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  sub = new Subscription();
  internetConnected$: Observable<boolean>;
  showInternetConnectionAlert = false;
  internetConnectionMsg = '';
  shortcuts: ShortcutInput[] = [];
  showGlobalLoader$ = this.store$.select(selectShowGlobalLoader);

  triedForGeloLocationAtleastOnce = false;

  constructor(
    private router: Router,
    private store$: Store,
    private swUpdate: SwUpdate,
    private breakpointObserver: BreakpointObserver,
    public themeService: ThemeService,
    private uiService: UIService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Production
        // G-KXNY18ZCF1

        // Development
        // G-W95DBTW5SY

        gtag('config', environment.gtag, {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }

  ngOnInit() {
    // Show overlay if js bundles are loading
    this.bundleLoading();

    this.internetConnected$ = this.store$.select(selectInternetConnected);
    this.internetOnlineOffline();
    this.pwaUpdate();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.store$.dispatch(
      UIActions.windowResized({
        size: {
          height: event.target.innerHeight,
          width: event.target.innerWidth,
        },
      })
    );
  }

  ngAfterViewInit() {
    this.updateBreakpoints();

    this.store$.dispatch(
      UIActions.windowResized({
        size: {
          height: window.innerHeight,
          width: window.innerWidth,
        },
      })
    );

    // Search Shortcut
    this.shortcuts.push({
      key: 'alt + s',
      preventDefault: true,
      allowIn: [AllowIn.Input],
      command: (e) => {
        if (CommonStatic.getUserId()) {
          this.store$.dispatch(HomeUIActions.showSearch());
        }
      },
    });
  }

  bundleLoading() {
    this.sub.add(
      this.router.events.subscribe((ev) => {
        if (ev instanceof RouteConfigLoadStart) {
          this.store$.dispatch(UIActions.showGlobalLoader());
        }
        if (ev instanceof RouteConfigLoadEnd) {
          this.store$.dispatch(UIActions.hideGlobalLoader());
        }
      })
    );
  }

  @HostListener('window:resize', ['$event'])
  windowResized(event) {
    this.store$.dispatch(
      UIActions.windowResized({
        size: {
          height: event.target.innerHeight,
          width: event.target.innerWidth,
        },
      })
    );
  }

  internetOnlineOffline() {
    this.sub.add(
      fromEvent(window, 'online')
        .pipe(mapTo(true))
        .subscribe((value) => {
          this.store$.dispatch(UIActions.internetConnected());

          this.showInternetConnectionAlert = true;
          this.internetConnectionMsg = 'Connected to TIME Server';
          setTimeout(() => {
            this.showInternetConnectionAlert = false;
          }, 2500);

          location.reload();
        })
    );

    this.sub.add(
      fromEvent(window, 'offline')
        .pipe(mapTo(false))
        .subscribe((value) => {
          this.store$.dispatch(UIActions.internetDisconnected());
          this.showInternetConnectionAlert = true;
          this.internetConnectionMsg = 'Please check your internet connection';
        })
    );
  }

  pwaUpdate() {
    this.sub.add(
      this.swUpdate.available.subscribe((event) => {
        this.uiService.showSnackBar('Refreshing TIME app', SnackbarType.warn);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
    );
  }

  updateBreakpoints() {
    let largeScreen: boolean;
    this.sub.add(
      this.breakpointObserver
        .observe([
          Breakpoints.XSmall,
          Breakpoints.Small,
          Breakpoints.Medium,
          Breakpoints.Large,
          Breakpoints.XLarge,
        ])
        .subscribe((state: BreakpointState) => {
          largeScreen = false;

          if (state.breakpoints[Breakpoints.XSmall]) {
            this.store$.dispatch(
              UIActions.setUIBreakpoint({
                breakpoint: Breakpoints.XSmall,
              })
            );

            CommonStatic.currentBreakPoint = 'xs';
          }
          if (state.breakpoints[Breakpoints.Small]) {
            largeScreen = false;
            this.store$.dispatch(
              UIActions.setUIBreakpoint({
                breakpoint: Breakpoints.Small,
              })
            );

            CommonStatic.currentBreakPoint = 'sm';
          }
          if (state.breakpoints[Breakpoints.Medium]) {
            // Could be bigger Tablet or Laptop
            largeScreen = true;
            this.store$.dispatch(
              UIActions.setUIBreakpoint({
                breakpoint: Breakpoints.Medium,
              })
            );

            CommonStatic.currentBreakPoint = 'md';
          }
          if (state.breakpoints[Breakpoints.Large]) {
            largeScreen = true;
            this.store$.dispatch(
              UIActions.setUIBreakpoint({
                breakpoint: Breakpoints.Large,
              })
            );

            CommonStatic.currentBreakPoint = 'lg';
          }

          if (state.breakpoints[Breakpoints.XLarge]) {
            largeScreen = true;

            this.store$.dispatch(
              UIActions.setUIBreakpoint({
                breakpoint: Breakpoints.XLarge,
              })
            );

            CommonStatic.currentBreakPoint = 'lg';
          }

          if (largeScreen === true) {
            this.store$.dispatch(UIActions.isLargeScreen());
          } else {
            this.store$.dispatch(UIActions.isSmallScreen());
          }
        })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
