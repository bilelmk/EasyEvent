import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetpasswordPageRoutingModule } from './setpassword-routing.module';

import { SetpasswordPage } from './setpassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetpasswordPageRoutingModule
  ],
  declarations: [SetpasswordPage]
})
export class SetpasswordPageModule {}
