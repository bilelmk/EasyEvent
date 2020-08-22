import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvitationMapPageRoutingModule } from './invitation-map-routing.module';

import { InvitationMapPage } from './invitation-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvitationMapPageRoutingModule
  ],
  declarations: [InvitationMapPage]
})
export class InvitationMapPageModule {}
