import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvitationMapPage } from './invitation-map.page';

const routes: Routes = [
  {
    path: '',
    component: InvitationMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitationMapPageRoutingModule {}
