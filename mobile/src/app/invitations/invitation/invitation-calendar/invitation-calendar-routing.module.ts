import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvitationCalendarPage } from './invitation-calendar.page';

const routes: Routes = [
  {
    path: '',
    component: InvitationCalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitationCalendarPageRoutingModule {}
