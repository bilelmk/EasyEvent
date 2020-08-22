import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AlertInput } from '@ionic/core';
import { Storage } from "@ionic/Storage";
import { VoteService } from "../../../shared/services/http/vote.service";
import { Vote } from "../../../shared/classes/Vote";
import { AuthService } from "../../../shared/services/http/auth.service";

@Component({
  selector: 'app-votes',
  templateUrl: './votes.page.html',
  styleUrls: ['./votes.page.scss'],
})
export class VotesPage implements OnInit {

  votes : Vote[] = null ;
  user_id = null ;

  constructor(private modalCtrl :ModalController , private alertController : AlertController , private voteService : VoteService ,
              private loadingController : LoadingController, private storage: Storage , private authService : AuthService) { }


    ngOnInit() {
        this.loadingController.create({message: "Loading . . . "}).then(
            loading => {
                loading.present();
                this.storage.get('acceptedInvitation').then(
                    res => {
                        this.authService.getAuthData().then(
                            data => {
                                this.user_id = data.id
                                this.voteService.getUserVote(res.event.event_id , this.user_id).subscribe(
                                    votes => {
                                        this.votes = votes ;
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
    if(this.votes == null ){
      return null;
    }
    else if(this.votes.length == 0 ){
      return 'novotes' ;
    }
    return 'votes'
  }

  async presentAlertPrompt(vote: any) {
    const alert = await this.alertController.create({
      header: vote.title ,
      inputs:  this.getOptionsForm(vote.options_list , vote.response_list[0]) ,
      buttons: [
         {
          text: 'Voter',
          handler: (option) => this.vote(vote , option)
        }
      ]
    });

    await alert.present();
  }

  getOptionsForm(options : any , response : any) {
    let tab : AlertInput[] = [] ;
    for (let option of options) {
      let alertOption : AlertInput = {
        checked : response ? response.option.option_id == option.option_id : false ,
        name: option.title ,
        type: 'radio' ,
        label: option.title ,
        value: option ,
      };
      tab.push(alertOption)
    }
    return tab ;
  }

    vote(vote : Vote , option : any ) {
        if(!vote.response_list[0]) {
            this.loadingController.create({message: "Loading . . . "}).then(
                loading => {
                    let new_response = {
                        user : {
                            user_id : this.user_id
                        },
                        option : option
                    };
                    loading.present();
                    this.voteService.addResponse(new_response, vote.vote_id).subscribe(
                        res =>{
                            vote.response_list.push(new_response)
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
                    vote.response_list[0].option = option ;
                    loading.present();
                    this.voteService.updateExistResponse(vote.response_list[0]).subscribe(
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

}
