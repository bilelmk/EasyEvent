import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/Storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'
import { TranslateModule , TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Network } from '@ionic-native/network/ngx';

export function createTranslateLoader(http : HttpClient){
  return new TranslateHttpLoader(http ,  'assets/i18n/' , '.json')
}


@NgModule({
  declarations: [AppComponent ],
  entryComponents: [],
  imports: [
    IonicModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader : {
        provide : TranslateLoader ,
        useFactory : (createTranslateLoader),
        deps : [HttpClient]
      }
    }),
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,
    Network
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
