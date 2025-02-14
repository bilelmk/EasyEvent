import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { EventPageRoutingModule } from './event-routing.module';

import { EventPage } from './event.page';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventPageRoutingModule,
    SuperTabsModule,
    TranslateModule
  ],
  declarations: [
      EventPage,
  ],
})
export class EventPageModule {}
