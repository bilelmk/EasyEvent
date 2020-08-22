import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventPage } from './event.page';

const routes: Routes = [
  {
    path: '',
    component: EventPage ,
    children :[
      {
        path: '',
        redirectTo : 'event-home',
        pathMatch : 'full'
      },
      {
        path: 'attendees',
        loadChildren: () => import('./attendees/attendees.module').then(m => m.AttendeesPageModule)
      },
      {
        path: 'event-home',
        loadChildren: () => import('./event-home/event-home.module').then(m => m.EventHomePageModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarPageModule)
      },
      {
        path: 'map',
        loadChildren: () => import('./map/map.module').then(m => m.MapModule)
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventPageRoutingModule {}
