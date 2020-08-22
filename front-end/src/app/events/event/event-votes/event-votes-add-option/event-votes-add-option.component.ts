import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VoteService } from '../../../../shared/services/http/vote.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { NotificationService } from '../../../../shared/services/interne/notification.service';
import { VoteOption } from '../../../../shared/classes/VoteOption';
import { SpinnerService } from '../../../../shared/services/interne/spinner.service';

@Component({
  selector: 'app-event-votes-add-option',
  templateUrl: './event-votes-add-option.component.html',
  styleUrls: ['./event-votes-add-option.component.scss']
})
export class EventVotesAddOptionComponent implements OnInit {

  optionForm: FormGroup;

  constructor(private voteService: VoteService , public dialog: MatDialog , private spinnerService : SpinnerService ,
              public matDialogRef: MatDialogRef<EventVotesAddOptionComponent> ,
              @Inject(MAT_DIALOG_DATA) private data: any , private notificationService : NotificationService) {
  }

  ngOnInit() {
    this.optionForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null),
    });
  }

  addOption() {
    this.spinnerService.activate() ;

    // Create vote option
    let option = new VoteOption();
    option.title = this.optionForm.value.title;
    option.description = this.optionForm.value.description;

    //Send Option
    this.voteService.posteVoteOption( this.data.vote_id , option).subscribe(
      res => {
        this.data.options_list = res.options_list ;
        this.notificationService.openSnackBar('Option added successfully' , 'green-snackbar') ;
        this.spinnerService.deactivate() ;
      },
      err => {
        this.notificationService.openSnackBar('Error when adding option' , 'red-snackbar') ;
        this.spinnerService.deactivate()
      });
    this.matDialogRef.close()
  }

}
