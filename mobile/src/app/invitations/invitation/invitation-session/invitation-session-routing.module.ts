import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvitationSessionPage } from './invitation-session.page';

const routes: Routes = [
  {
    path: '',
    component: InvitationSessionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitationSessionPageRoutingModule {}
