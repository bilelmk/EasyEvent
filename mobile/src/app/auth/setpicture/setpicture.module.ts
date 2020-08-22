import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetpicturePageRoutingModule } from './setpicture-routing.module';

import { SetpicturePage } from './setpicture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetpicturePageRoutingModule
  ],
  declarations: [SetpicturePage]
})
export class SetpicturePageModule {}
