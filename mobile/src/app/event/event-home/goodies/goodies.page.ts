import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { AuthService } from '../../../shared/services/http/auth.service';
import { AlertInput } from '@ionic/core';
import { Goody } from '../../../shared/classes/Goody';
import { GoodiesService } from '../../../shared/services/http/goodies.service';


@Component({
  selector: 'app-goodies',
  templateUrl: './goodies.page.html',
  styleUrls: ['./goodies.page.scss'],
})
export class GoodiesPage implements OnInit {

  goodies : Goody[] = null ;
  user_id = null ;

  constructor(private modalCtrl :ModalController , private alertController : AlertController , private goodiesService : GoodiesService,
              private loadingController : LoadingController, private storage: Storage , private authService : AuthService) { }


  ngOnInit() {
    this.loadingController.create({message: "Loading . . . "}).then(
        loading => {
          loading.present();
          this.storage.get('acceptedInvitation').then(
              res => {
                this.authService.getAuthData().then(
                    data => {
                      this.user_id = data.id ;
                      this.goodiesService.getUserGoodies(res.event.event_id , this.user_id).subscribe(
                          goodies => {
                            this.goodies = goodies ;
                            console.log(goodies)
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


  resolve(){
    if(this.goodies == null ){
      return null;
    }
    else if(this.goodies.length == 0 ){
      return 'nodata' ;
    }
    return 'data'
  }

  async presentAlertPrompt(feature: any , goody :any) {
    const alert = await this.alertController.create({
      header: feature.feature_name ,
      inputs:  this.getOptionsForm(feature.option_list , goody.response_list) ,
      buttons: [
        {
          text: 'Choose',
          handler: (option) => this.choose(option , goody)
        }
      ]
    });

    await alert.present();
  }

  getOptionsForm(options : any , responses : any) {
    let tab : AlertInput[] = [] ;
    for (let option of options) {
      let alertOption : AlertInput = {
        checked : this.getFeatureResponse(option , responses ) ,
        name: option.option_name ,
        type: 'radio' ,
        label: option.option_name ,
        value: option ,
      };
      tab.push(alertOption)
    }
    return tab ;
  }

  getFeatureResponse(option , responses) {
    for(let resp of responses) {
      if(resp.response_option.goody_option_id == option.goody_option_id) {
        return true ;
      }
    }
    return false ;
  }

  choose(option , goody) {
    // if(!vote.response_list[0]) {
      this.loadingController.create({message: "Loading . . . "}).then(
          loading => {
            console.log(option) ;
            let new_response = {
              user : {
                user_id : this.user_id
              },
              response_option : option
            };
            loading.present();
            this.goodiesService.addResponse(new_response, goody.goody_id).subscribe(
                res =>{
                  goody.response_list.push(new_response) ;
                  loading.dismiss();
                },
                error => {
                  console.log(error);
                  loading.dismiss();
                }
            )
          }).catch(err => {
        console.log(err)
      })
    // }
    // else{
    //   this.loadingController.create({message: "Loading . . . "}).then(
    //       loading => {
    //         vote.response_list[0].option = option ;
    //         loading.present();
    //         this.voteService.updateExistResponse(vote.response_list[0]).subscribe(
    //             res =>{
    //               loading.dismiss();
    //             },
    //             error => {
    //               console.log(error)
    //               loading.dismiss();
    //             }
    //         )
    //       }).catch(err => {
    //     console.log(err)
    //   })
    // }
  }

}
