import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilePage } from "./profile.page";
import { ProfilePageRoutingModule } from "./profile-routing.module";
import { Camera } from '@ionic-native/camera/ngx';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfilePageRoutingModule,
        TranslateModule,

    ],
  declarations: [ProfilePage ] ,
  entryComponents : [],
  providers :[Camera]
})
export class ProfilePageModule {}
