import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendeesPageRoutingModule } from './attendees-routing.module';

import { AttendeesPage } from './attendees.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendeesPageRoutingModule,
    TranslateModule
  ],
  declarations: [AttendeesPage]
})
export class AttendeesPageModule {}
