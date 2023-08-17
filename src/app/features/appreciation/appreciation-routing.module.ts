import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AppreciationContainerComponent,
} from 'src/app/features/appreciation/components/appreciation-container/appreciation-container.component';
import { AuthGuard } from 'src/app/guards/authguard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AppreciationContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppreciationRoutingModule {}
