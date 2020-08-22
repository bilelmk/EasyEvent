import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { Storage } from '@ionic/Storage';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translate : TranslateService , private storage : Storage) { }

  setInitialAppLanguage(){
    this.storage.get('language').then(
        language => {
          if (language){
            this.translate.setDefaultLang(language)
          }
          else {
            this.storage.set('language' , 'fr');
            this.translate.setDefaultLang('fr')
          }
        }
    ).catch(err => console.log(err) )
  }

  changeLanguage(language){
    this.storage.set('language' , language);
    this.translate.use(language)
  }
}
