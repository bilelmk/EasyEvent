import { Component, Inject, OnInit } from '@angular/core';
import { VoteService } from '../../../../shared/services/http/vote.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { NotificationService } from '../../../../shared/services/interne/notification.service';
import { SpinnerService } from '../../../../shared/services/interne/spinner.service';

@Component({
  selector: 'app-event-votes-delete',
  templateUrl: './event-votes-delete.component.html',
  styleUrls: ['./event-votes-delete.component.scss']
})
export class EventVotesDeleteComponent implements OnInit {
  constructor(private voteService: VoteService, @Inject(MAT_DIALOG_DATA) private data: any,
              public matDialogRef: MatDialogRef<EventVotesDeleteComponent>, public dialog: MatDialog,
              private notificationService : NotificationService , private spinnerService : SpinnerService) {}

  ngOnInit() {
  }

  deleteVote() {
    this.spinnerService.activate();
    this.voteService.deleteVote(this.data.id).subscribe(
      res => {
        this.data.votes.splice(
          this.data.votes.findIndex(vote => {
            return  vote.vote_id == this.data.id
          }),1);
        this.notificationService.openSnackBar('Vote deleted successfully' , 'green-snackbar') ;
        this.spinnerService.deactivate() ;
      },
      err => {
        console.log(err);
        this.notificationService.openSnackBar('Error when deleting vote' , 'red-snackbar') ;
        this.spinnerService.deactivate() ;
      }
    );
    this.matDialogRef.close(false)
  }
}
