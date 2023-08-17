import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginContainerComponent } from 'src/app/components/login/login-container.component';
import {
  ChangePasswordContainerComponent,
} from 'src/app/shared/components/change-password-container/change-password-container.component';

import {
  ForgotPasswordContainerComponent,
} from './components/forgot-password/forgot-password-container/forgot-password-container.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginContainerComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordContainerComponent,
  },

  { path: 'change-password', component: ChangePasswordContainerComponent },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    useHash: true,
    relativeLinkResolution: 'legacy'
}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
