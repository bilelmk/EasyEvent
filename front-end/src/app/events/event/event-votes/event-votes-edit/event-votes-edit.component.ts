import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VoteService } from '../../../../shared/services/http/vote.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Vote } from '../../../../shared/classes/Vote';
import { NotificationService } from '../../../../shared/services/interne/notification.service';
import { SpinnerService } from '../../../../shared/services/interne/spinner.service';

@Component({
  selector: 'app-event-votes-edit',
  templateUrl: './event-votes-edit.component.html',
  styleUrls: ['./event-votes-edit.component.scss']
})
export class EventVotesEditComponent implements OnInit {

  updateForm : FormGroup ;

  constructor(private voteService: VoteService, @Inject(MAT_DIALOG_DATA) private data: any,
              public matDialogRef: MatDialogRef<EventVotesEditComponent> , public dialog: MatDialog ,
              private notificationService : NotificationService, private spinnerService : SpinnerService) {}

  ngOnInit() {
    this.updateForm = new FormGroup({
      'title' : new FormControl(this.data.title, Validators.required ),
      'description' : new FormControl(this.data.description , Validators.required ),
    });
  }

  updateVote() {
    let updatedVote = this.updateForm.value ;
    updatedVote.vote_id = this.data.vote_id;
    this.voteService.putVote(updatedVote).subscribe(
      (res : Vote) => {
        this.data.title = res.title ;
        this.data.description = res.description ;
        this.notificationService.openSnackBar('Vote updated successfully' , 'green-snackbar') ;
        this.spinnerService.deactivate() ;
      },
      err => {
        console.log(err);
        this.notificationService.openSnackBar('Error when updating vote' , 'red-snackbar') ;
        this.spinnerService.deactivate() ;
      }
    );
    this.matDialogRef.close()
  }
}
