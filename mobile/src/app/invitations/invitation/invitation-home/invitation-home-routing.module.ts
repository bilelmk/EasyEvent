import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvitationHomePage } from './invitation-home.page';

const routes: Routes = [
  {
    path: '',
    component: InvitationHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitationHomePageRoutingModule {}
