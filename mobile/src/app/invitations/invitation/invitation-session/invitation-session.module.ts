import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvitationSessionPageRoutingModule } from './invitation-session-routing.module';

import { InvitationSessionPage } from './invitation-session.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvitationSessionPageRoutingModule
  ],
  declarations: [InvitationSessionPage]
})
export class InvitationSessionPageModule {}
