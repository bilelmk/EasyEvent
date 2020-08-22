import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvitationPage } from './invitation.page';

const routes: Routes = [
  {
    path: '',
    component: InvitationPage ,
    children :[
      {
        path: '',
        redirectTo :'invitation-home' ,
        pathMatch : 'full'
      },
      {
        path: 'invitation-calendar',
        loadChildren: () => import('./invitation-calendar/invitation-calendar.module').then(m => m.InvitationCalendarPageModule)
      },
      {
        path: 'invitation-home',
        loadChildren: () => import('./invitation-home/invitation-home.module').then(m => m.InvitationHomePageModule)
      },
      {
        path: 'invitation-map',
        loadChildren: () => import('./invitation-map/invitation-map.module').then(m => m.InvitationMapPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitationPageRoutingModule {}
