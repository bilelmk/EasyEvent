import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './shared/services/http/auth.service';
import { LanguageService } from "./shared/services/local/language.service";
import { NetworkService , ConnectionStatus } from './shared/services/local/network.service';
import { OfflineService } from './shared/services/local/offline.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService : AuthService,
    private languageService : LanguageService ,
    private networkService : NetworkService ,
    private offlineService : OfflineService ,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authService.autoAuthUser();
      this.languageService.setInitialAppLanguage() ;
      this.networkService.onNetworkChange().subscribe((status: ConnectionStatus) => {
        if (status == ConnectionStatus.Online) {
          this.offlineService.checkForEvents().subscribe();
        }
      });
    });
  }
}
