import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { InvitationCalendarPageRoutingModule } from './invitation-calendar-routing.module';

import { InvitationCalendarPage } from './invitation-calendar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvitationCalendarPageRoutingModule,
  ],
  declarations: [InvitationCalendarPage]
})
export class InvitationCalendarPageModule {}
