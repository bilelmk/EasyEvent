import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component'
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';

import {
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatSlideToggleModule,
  MatSidenavModule,
  MatDialogModule,
  MatSliderModule,
  MatListModule,
  MatIconModule,
} from '@angular/material';

import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: MainComponent ,
    children : [
      {
        path: '',
        redirectTo: 'events',
        pathMatch: 'full',
      },
      {
        path: 'events',
        loadChildren : '../events/events.module#EventsModule'
      },
      {
        path: 'create_event',
        loadChildren :'../create-event/create-event.module#CreateEventModule'
      },
      {
        path: 'badges',
        loadChildren :'../badges-generator/badges-generator.module#BadgesGeneratorModule'
      },
      {
        path: 'users',
        loadChildren :'../users/users.module#UsersModule'
      },
      {
        path: 'groups',
        loadChildren :'../group/group.module#GroupModule'
      },
    ]
  },
];


@NgModule({
  declarations: [
    SidebarComponent,
    ToolbarComponent,
    MainComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    // MainRoutingModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatDialogModule,
    MatSliderModule,
    MatListModule,
    MatIconModule,
    TranslateModule
  ]
})
export class MainModule { }
