import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvitationsPage } from './invitations.page';

const routes: Routes = [
  {
    path: '',
    component: InvitationsPage ,
  },
  {
    path: 'invitation',
    loadChildren: () => import('./invitation/invitation.module').then(m => m.InvitationPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitationsPageRoutingModule {}
