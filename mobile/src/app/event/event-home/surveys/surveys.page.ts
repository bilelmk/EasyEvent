import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { SurveyService } from "../../../shared/services/http/survey.service";
import { Survey } from "../../../shared/classes/Survey";
import { Storage } from '@ionic/Storage';
import { AuthService } from "../../../shared/services/http/auth.service";

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.page.html',
  styleUrls: ['./surveys.page.scss'],
})
export class SurveysPage implements OnInit {

  surveys : Survey [] = null ;
  user_id = null ;

  constructor(private modalCtrl : ModalController , private loadingController : LoadingController, private storage: Storage ,
            private surveysService : SurveyService , private authService : AuthService) { }

  ngOnInit() {
    this.loadingController.create({message: "Loading . . . "}).then(
        loading => {
          loading.present();
          this.storage.get('acceptedInvitation').then(
              res => {
                  this.authService.getAuthData().then(
                      data => {
                          this.user_id = data.id ;
                          this.surveysService.getUserSurveys(res.event.event_id , this.user_id).subscribe(
                              surveys => {
                                  this.surveys = surveys ;
                                  loading.dismiss();
                              }, error => {
                                  loading.dismiss();
                                  console.log(error)
                              }
                          );
                  }).catch(err => {
                      console.log(err);
                      loading.dismiss();
                  });
               }
          ).catch(err => {
            console.log(err);
            loading.dismiss();
          });
        }).catch(err => {
          console.log(err)
        }
    )
  }

  dismiss() {
    this.modalCtrl.dismiss().then((res) => console.log(res)).catch((err) => console.log(err));
  }

  resolve() {
    if(this.surveys == null ){
      return null;
    }
    else if(this.surveys.length == 0 ){
      return 'nosurveys' ;
    }
    return 'surveys'
  }

  rate(index: number ,  survey : Survey) {
    if(!survey.response_list[0]) {
        this.loadingController.create({message: "Loading . . . "}).then(
            loading => {
                let new_response = {
                    user : {
                        user_id : this.user_id
                    },
                    stars : index+1
                };
                loading.present();
                this.surveysService.addResponse(new_response, survey.survey_id).subscribe(
                    res =>{
                        survey.response_list.push(new_response)
                        loading.dismiss();
                    },
                    error => {
                        console.log(error)
                        loading.dismiss();
                    }
                )
            }).catch(err => {
            console.log(err)
        })
    }
    else{
        this.loadingController.create({message: "Loading . . . "}).then(
            loading => {
                survey.response_list[0].stars = index+1 ;
                loading.present();
                this.surveysService.updateExistResponse(survey.response_list[0]).subscribe(
                    res =>{
                        loading.dismiss();
                    },
                    error => {
                        console.log(error)
                        loading.dismiss();
                    }
                )
            }).catch(err => {
            console.log(err)
        })
    }
  }

  getColor(index: number , response : any) {
     if(!response[0]) {
         return '' ;
     }
     else {
         if(index < response[0].stars ) {
             return '#fda613' ;
         }
         else {
             return '' ;
         }
     }

  }

  getRange(rating: number) {
    return [...Array(rating).keys()]
  }
}
