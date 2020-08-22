import { Component } from '@angular/core';
import { AuthService } from './shared/services/http/auth.service';
import { LanguageService } from './shared/services/interne/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService : AuthService , private languageService : LanguageService){}

  ngOnInit(): void {
    this.authService.autoAuthUser();
    this.languageService.setInitialAppLanguage() ;
  }

}
