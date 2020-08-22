import { Component, OnInit } from '@angular/core';
import { Vote } from '../../../shared/classes/Vote';
import { ExistEventService } from '../../../shared/services/interne/exist-event.service';
import { MatDialog } from '@angular/material';
import { VoteService } from '../../../shared/services/http/vote.service';
import { Event } from '../../../shared/classes/Event';
import { EventVotesDeleteComponent } from './event-votes-delete/event-votes-delete.component';
import { EventVotesAddComponent } from './event-votes-add/event-votes-add.component';
import { EventVotesEditComponent } from './event-votes-edit/event-votes-edit.component';
import { EventVotesAddOptionComponent } from './event-votes-add-option/event-votes-add-option.component';
import { SpinnerService } from '../../../shared/services/interne/spinner.service';
import { EventVoteResultComponent } from './event-vote-result/event-vote-result.component';

@Component({
  selector: 'app-event-votes',
  templateUrl: './event-votes.component.html',
  styleUrls: ['./event-votes.component.scss']
})
export class EventVotesComponent implements OnInit {

  existEvent : Event ;
  votes : Vote[] = null ;
  error = false ;

  constructor(private existEventService : ExistEventService,public dialog: MatDialog , private pollService : VoteService ,
              private spinnerService : SpinnerService) { }

  ngOnInit() {
    this.spinnerService.activate() ;
    this.existEvent = this.existEventService.getExistEvent();
    this.pollService.getVotesByEventId(this.existEvent.event_id).subscribe(
      res => {
        this.votes = res ;
        this.spinnerService.deactivate() ;
      },
      err => {
        console.log(err) ;
        this.error = true ;
        this.spinnerService.deactivate() ;
      }
    );
  }

  deleteOption(id , options_list){
    this.spinnerService.activate() ;
    this.pollService.deleteVoteOption(id).subscribe(
      res => {
        options_list.splice(options_list.findIndex( option => {
            return option.option_id == id
        }), 1 ) ;
        this.spinnerService.deactivate() ;
      },
      err => {
        console.log(err) ;
        this.spinnerService.deactivate() ;
      }
    );
  }

  openAddVoteDialog(): void {
    const dialogRef = this.dialog.open( EventVotesAddComponent, {
      panelClass: 'custom-dialog-container' , width: '800px' , height: '600px' ,  data : { 'id' : this.existEvent.event_id , 'votes' : this.votes}
    });
  }

  openEditVoteDialog(vote : Vote) {
    const dialogRef = this.dialog.open( EventVotesEditComponent , {
      panelClass: 'custom-dialog-container' , width : '800px' , height : '600px' , data : vote
    });
  }

  openDeleteVoteDialog(vote_id: any) {
    const dialogRef = this.dialog.open( EventVotesDeleteComponent, {
      panelClass: 'custom-dialog-container' , width: '800px', height: '400px' , data : { 'id' : vote_id , 'votes' : this.votes}
    });
  }

  openVoteResultDialog(vote : Vote) {
    const dialogRef = this.dialog.open( EventVoteResultComponent, {
      panelClass: 'custom-dialog-container' , width: '800px', height: '600px' , data : vote
    });
  }

  openAddVoteOptionDialog(vote : Vote) {
    const dialogRef = this.dialog.open( EventVotesAddOptionComponent, {
      panelClass: 'custom-dialog-container' , width : '800px' , height : '600px' , data : vote
    });
  }

  resolve(){
    if(this.error === true ){
      return null ;
    }
    else if(this.votes.length == 0 ){
      return 'nodata' ;
    }
    return 'data'
  }



}
