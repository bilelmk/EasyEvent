import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event.component';
import { RouterModule, Routes} from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventGuard } from '../../shared/services/guards/event.guard';
import { EventSidebarComponent } from './event-sidebar/event-sidebar.component';
import { EventDescriptionComponent } from './event-description/event-description.component';
import { EventAttendeesComponent } from './event-attendees/event-attendees.component';
import { EventPlanComponent } from './event-plan/event-plan.component';
import { EventPlanAddSessionComponent } from './event-plan/event-plan-add-session/event-plan-add-session.component';
import { EventPlanEditSessionComponent } from './event-plan/event-plan-edit-session/event-plan-edit-session.component';
import { EventPlanDeleteSessionComponent } from './event-plan/event-plan-delete-session/event-plan-delete-session.component';
import { EventPlanEditSubsessionComponent } from './event-plan/event-plan-edit-subsession/event-plan-edit-subsession.component';
import { EventPlanDeleteSubsessionComponent } from './event-plan/event-plan-delete-subsession/event-plan-delete-subsession.component';
import { EventPlanAddSubsessionComponent } from './event-plan/event-plan-add-subsession/event-plan-add-subsession.component';
import { EventSurveysComponent } from './event-surveys/event-surveys.component';
import { EventSurveysAddComponent } from './event-surveys/event-surveys-add/event-surveys-add.component';
import { EventSurveysDeleteComponent } from './event-surveys/event-surveys-delete/event-surveys-delete.component';
import { EventSurveysResultComponent } from './event-surveys/event-surveys-result/event-surveys-result.component';
import { EventSurveysEditComponent } from './event-surveys/event-surveys-edit/event-surveys-edit.component';
import { EventVotesComponent } from './event-votes/event-votes.component';
import { EventVotesDeleteComponent } from './event-votes/event-votes-delete/event-votes-delete.component';
import { EventVotesEditComponent } from './event-votes/event-votes-edit/event-votes-edit.component';
import { EventVotesAddOptionComponent } from './event-votes/event-votes-add-option/event-votes-add-option.component';
import { EventVotesAddComponent } from './event-votes/event-votes-add/event-votes-add.component';
import { EventRoomsComponent } from './event-rooms/event-rooms.component';
import { EventGroupsComponent } from './event-groups/event-groups.component';
import { EventGoodiesComponent } from './event-goodies/event-goodies.component';
import { EventGoodiesAddComponent } from './event-goodies/event-goodies-add/event-goodies-add.component';
import { EventGoodiesEditComponent } from './event-goodies/event-goodies-edit/event-goodies-edit.component';
import { EventGoodiesDeleteComponent } from './event-goodies/event-goodies-delete/event-goodies-delete.component';
import { EventGoodiesFeatureAddComponent } from './event-goodies/event-goodies-feature-add/event-goodies-feature-add.component';
import { EventGoodiesFeatureEditComponent } from './event-goodies/event-goodies-feature-edit/event-goodies-feature-edit.component';
import { EventGoodiesFeatureDeleteComponent } from './event-goodies/event-goodies-feature-delete/event-goodies-feature-delete.component';
import { EventGoodiesOptionAddComponent } from './event-goodies/event-goodies-option-add/event-goodies-option-add.component';
import { EventGoodiesResultComponent } from './event-goodies/event-goodies-result/event-goodies-result.component';

import { EventVoteResultComponent } from './event-votes/event-vote-result/event-vote-result.component';

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
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatTooltipModule,
  MatRippleModule,
  MatCheckboxModule,
  MatChipsModule, MatPaginatorModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';


const routes: Routes = [
  {
    path : '' ,
    component : EventComponent ,
    children: [
      {
        path : '',
        redirectTo : 'event-decription' ,
        pathMatch : 'full'
      },
      {
        path : 'event-decription',
        component: EventDescriptionComponent ,
        canActivate: [EventGuard]
      },
      {
        path     : 'event-attendees',
        component: EventAttendeesComponent ,
        canActivate: [EventGuard]
      },
      {
        path     : 'event-plan',
        component: EventPlanComponent ,
        canActivate: [EventGuard]

      },
      {
        path     : 'event-votes',
        component: EventVotesComponent ,
        canActivate: [EventGuard]

      },
      {
        path     : 'event-surveys',
        component: EventSurveysComponent ,
        canActivate: [EventGuard]
      },
      {
        path     : 'event-goodies',
        component: EventGoodiesComponent ,
        canActivate: [EventGuard]
      },
      {
        path     : 'event-groups',
        component: EventGroupsComponent ,
        canActivate: [EventGuard]
      },
      {
        path     : 'event-rooms',
        component: EventRoomsComponent ,
        canActivate: [EventGuard]
      }
    ]
  }
];

@NgModule({
  declarations: [EventComponent ,
      EventDescriptionComponent,
      EventAttendeesComponent,
      EventSidebarComponent,
      EventPlanComponent,
      EventPlanAddSessionComponent,
      EventPlanEditSessionComponent,
      EventPlanDeleteSessionComponent,
      EventPlanEditSubsessionComponent,
      EventPlanDeleteSubsessionComponent,
      EventPlanAddSubsessionComponent,
      EventSurveysComponent,
      EventSurveysAddComponent,
      EventSurveysDeleteComponent,
      EventSurveysResultComponent,
      EventSurveysEditComponent,
      EventVotesComponent,
      EventVotesAddComponent,
      EventVotesAddOptionComponent,
      EventVotesEditComponent,
      EventVotesDeleteComponent,
      EventVoteResultComponent ,
      EventGroupsComponent,
      EventRoomsComponent,
      EventGoodiesComponent,
      EventGoodiesAddComponent,
      EventGoodiesEditComponent,
      EventGoodiesDeleteComponent,
      EventGoodiesFeatureAddComponent,
      EventGoodiesFeatureEditComponent,
      EventGoodiesFeatureDeleteComponent,
      EventGoodiesOptionAddComponent,
      EventGoodiesResultComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ChartsModule,
    FormsModule,
    MatToolbarModule,
    MatSliderModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatTooltipModule,
    MatRippleModule,
    MatCheckboxModule,
    MatChipsModule,
    TranslateModule,
    MatPaginatorModule
  ],
  entryComponents : [
    EventPlanAddSessionComponent,
    EventPlanEditSessionComponent,
    EventPlanDeleteSessionComponent,
    EventPlanEditSubsessionComponent,
    EventPlanDeleteSubsessionComponent,
    EventPlanAddSubsessionComponent,
    EventSurveysAddComponent,
    EventSurveysDeleteComponent,
    EventSurveysResultComponent,
    EventSurveysEditComponent,
    EventVotesAddComponent,
    EventVotesAddOptionComponent,
    EventVotesEditComponent,
    EventVotesDeleteComponent,
    EventGroupsComponent,
    EventRoomsComponent,
    EventGoodiesComponent,
    EventGoodiesAddComponent,
    EventGoodiesEditComponent,
    EventGoodiesDeleteComponent,
    EventGoodiesFeatureAddComponent,
    EventGoodiesFeatureEditComponent,
    EventGoodiesFeatureDeleteComponent,
    EventGoodiesOptionAddComponent,
    EventVoteResultComponent,
    EventGoodiesResultComponent
  ],
  providers : []

})
export class EventModule { }
