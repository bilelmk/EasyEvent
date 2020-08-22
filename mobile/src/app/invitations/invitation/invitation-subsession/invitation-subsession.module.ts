import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvitationSubsessionPageRoutingModule } from './invitation-subsession-routing.module';

import { InvitationSubsessionPage } from './invitation-subsession.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvitationSubsessionPageRoutingModule
  ],
  declarations: [InvitationSubsessionPage]
})
export class InvitationSubsessionPageModule {}
