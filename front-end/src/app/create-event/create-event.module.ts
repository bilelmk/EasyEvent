import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { CreateEventComponent } from './create-event.component';
import { CreateEventSidebarComponent } from './create-event-sidebar/create-event-sidebar.component';
import { CreateEventPlanComponent } from './create-event-plan/create-event-plan.component';
import { CreateEventDescriptionComponent } from './create-event-description/create-event-description.component';
import { CreateEventPlanSessionComponent } from './create-event-plan/create-event-plan-session/create-event-plan-session.component';
import { CreateEventPlanSubsessionComponent } from './create-event-plan/create-event-plan-subsession/create-event-plan-subsession.component';
import { CreateEventGuard } from '../shared/services/guards/create-event.guard';

import {
  MatToolbarModule,
  MatSliderModule,
  MatListModule,
  MatIconModule,
  MatSidenavModule,
  MatTableModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatCardModule,
  MatTooltipModule,
  MatRippleModule, MatCheckboxModule,
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';




const routes: Routes = [
  {
    path : '' ,
    component : CreateEventComponent ,
    children: [
      {
        path : '',
        redirectTo : 'create-event-decription' ,
        pathMatch : 'full'
      },
      {
        path : 'create-event-decription',
        component: CreateEventDescriptionComponent ,
      },
      {
        path     : 'create-event-plan',
        component: CreateEventPlanComponent ,
        canActivate: [CreateEventGuard]
      },
    ]
  }
];


@NgModule({
  declarations: [
    CreateEventComponent,
    CreateEventPlanComponent,
    CreateEventDescriptionComponent,
    CreateEventPlanSessionComponent,
    CreateEventPlanSubsessionComponent,
    CreateEventSidebarComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatSliderModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    ImageCropperModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatNativeDateModule,
    MatCardModule,
    MatRippleModule,
    FormsModule,
    MatTooltipModule,
    MatCheckboxModule,
    TranslateModule
  ],
  entryComponents : [
    CreateEventPlanSessionComponent,
    CreateEventPlanSubsessionComponent,
  ]
})
export class CreateEventModule { }
