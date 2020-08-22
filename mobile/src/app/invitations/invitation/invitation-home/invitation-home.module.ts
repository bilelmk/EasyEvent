import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvitationHomePageRoutingModule } from './invitation-home-routing.module';

import { InvitationHomePage } from './invitation-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvitationHomePageRoutingModule
  ],
  declarations: [InvitationHomePage]
})
export class InvitationHomePageModule {}
