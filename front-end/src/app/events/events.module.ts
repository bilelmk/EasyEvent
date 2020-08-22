import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events.component';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path     : '',
    component : EventsComponent
  },
  {
    path     : 'event',
    loadChildren : './event/event.module#EventModule' ,
  },
];

@NgModule({
  declarations: [
    EventsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TranslateModule,
  ]
})
export class EventsModule { }
