import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvitationSubsessionPage } from './invitation-subsession.page';

const routes: Routes = [
  {
    path: '',
    component: InvitationSubsessionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitationSubsessionPageRoutingModule {}
