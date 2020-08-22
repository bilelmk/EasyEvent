import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MapPage } from './map';
import { MapPageRoutingModule } from './map-routing.module';
import { TranslateModule }  from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MapPageRoutingModule,
    TranslateModule
  ],
  declarations: [
    MapPage,
  ]
})
export class MapModule { }
