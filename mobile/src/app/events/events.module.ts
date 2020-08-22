import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyeventsPageRoutingModule } from './events-routing.module';

import { EventsPage } from './events.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyeventsPageRoutingModule,
    TranslateModule
  ],
  declarations: [EventsPage]
})
export class EventsPageModule {}
