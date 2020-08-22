import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VoteService } from '../../../../shared/services/http/vote.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Event } from '../../../../shared/classes/Event';
import { Vote } from '../../../../shared/classes/Vote';
import { NotificationService } from '../../../../shared/services/interne/notification.service';
import { VoteOption } from '../../../../shared/classes/VoteOption';
import { SpinnerService } from '../../../../shared/services/interne/spinner.service';

@Component({
  selector: 'app-event-votes-add',
  templateUrl: './event-votes-add.component.html',
  styleUrls: ['./event-votes-add.component.scss']
})
export class EventVotesAddComponent implements OnInit {

  voteForm: FormGroup ;
  options_list : VoteOption[] = [] ;

  constructor(private voteService: VoteService, public dialog: MatDialog, public matDialogRef: MatDialogRef<EventVotesAddComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any , private notificationService : NotificationService ,
              private spinnerService : SpinnerService) {}

  ngOnInit() {
    this.voteForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null),
    });
  }

  addVoteOption(option_title , option_description) {
    // Create new option
    let option = new VoteOption;
    option.title = option_title.value;
    option.description = option_description.value;

    // Add new option to options list
    this.options_list.push(option);

    // Delete exist value
    option_title.value = null;
    option_description.value = null;

    this.notificationService.openSnackBar('Option added successfully' , 'green-snackbar') ;
  }


  addVote() {
    this.spinnerService.activate() ;
    // Create vote
    let vote = new Vote;
    // vote.options_list = this.options;
    vote.title = this.voteForm.value.title;
    vote.description = this.voteForm.value.description;
    vote.event = new Event;
    vote.event.event_id = this.data.id;
    vote.options_list = this.options_list ;

    //Send Vote
    this.voteService.postVote(vote).subscribe(
      res => {
        if(this.data.votes) {
          this.data.votes.push(res)
        }
        else{
          this.data.votes = [] ;
          this.data.votes.push(res)
        }
        this.notificationService.openSnackBar('Vote added successfully' , 'green-snackbar') ;
        this.spinnerService.deactivate() ;
      },
      err => {
        this.notificationService.openSnackBar('Error when adding vote' , 'red-snackbar') ;
        this.spinnerService.deactivate() ;
      });
    this.matDialogRef.close()
  }

}
