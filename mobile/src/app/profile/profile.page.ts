import { Component, OnInit } from '@angular/core';
import { UserService } from "../shared/services/http/user.service";
import { DomSanitizer } from "@angular/platform-browser";
import {AlertController, LoadingController} from '@ionic/angular';
import { AuthService } from "../shared/services/http/auth.service";
import { User } from "../shared/classes/User";
import { Camera } from '@ionic-native/camera/ngx';
import {LanguageService} from '../shared/services/local/language.service';
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user : User = null ;
  imageData = new FormData;
  imageSelected = false ;
  oldImage =  null ;
  language ;
  offline ;
  dark ;

  constructor( private userService : UserService , private sanitizer: DomSanitizer ,private camera: Camera,
               private loadingController : LoadingController , private authService : AuthService ,
               private storage : Storage , private alertController : AlertController ,
               private languageService : LanguageService ) {}


  ionViewWillEnter() {
    this.loadingController.create({message: "Loading . . . "}).then(
        loading => {
          loading.present() ;
          this.authService.getAuthData().then(
              res => {
                this.userService.getUser(res.id).subscribe(
                    res => {
                      this.user = res ;
                      this.user.image =  this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + res.image.data);

                      loading.dismiss() ;
                    },
                    err => {
                      console.log(err);
                      loading.dismiss() ;
                    }
                )}
          ).catch(err => {
            console.log(err);
            loading.dismiss() ;
          });
        }).catch(err => {
          console.log(err)
        }
    )
  }

    ngOnInit(): void {
        this.storage.get('language').then(
            res => this.language = res
        ).catch(
            err => console.log(err)
        )
    }

  onPickImage(){
      let cameraOptions = {
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          destinationType: this.camera.DestinationType.DATA_URL,
          quality: 10,
          allowEdit : true ,
          targetWidth: 600,
          targetHeight: 600,
          encodingType: this.camera.EncodingType.JPEG,
          correctOrientation: true ,
          mediaType: this.camera.MediaType.PICTURE,

      };
      this.camera.getPicture(cameraOptions)
          .then((imageData) => {
              let base64Image = 'data:image/jpeg;base64,' + imageData;
              this.imageSelected = true ;
              this.oldImage = this.user.image ;
              this.user.image = base64Image;
              let name  = 'image' + (Date.now());
              this.imageData.append('image' , this.dataURLtoFile(base64Image , name))
        }, (err) => {
      });
  }


  saveImage(){
    this.loadingController.create({message: "Loading . . . "}).then(
        loading => {
          loading.present() ;
          this.userService.setImage(this.user.user_id, this.imageData).subscribe(
           res => {
             this.imageSelected = false ;
             loading.dismiss();
           } ,
           err => {
             loading.dismiss();
           }
          )
        })
    .catch(err => {
      console.log(err)
    })
  }


  cancel() {
    this.imageSelected = false ;
    this.user.image = this.oldImage ;
    this.imageData = new FormData;
  }

    // function to convert base64 to file
    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    async changeLanguage() {
        const alert = await this.alertController.create({
            header: "Choose a language" ,
            // this.getTranslatedWords('language') ,
            inputs: [
                {
                    name: 'fr',
                    type: 'radio',
                    label: 'French',
                    value: 'fr',
                    checked: this.language == 'fr'
                },
                {
                    name: 'en',
                    type: 'radio',
                    label: 'English',
                    value: 'en',
                    checked: this.language == 'en'
                },
            ],
            buttons: [
                {
                    text: 'Valider',
                    handler: (language) => {
                        this.language = language ;
                        this.languageService.changeLanguage(language)
                    }
                }
            ]
        });
        await alert.present();
    }
}
