import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translate : TranslateService ) { }

  setInitialAppLanguage(){
    let language = localStorage.getItem("language");
    if ( language ){
      this.translate.setDefaultLang(language)
    }
    else{
      localStorage.setItem("language" , 'fr');
      this.translate.setDefaultLang('fr')
    }
  }

  changeLanguage(language){
    this.translate.use(language) ;
    localStorage.setItem("language" , language);
  }

}
