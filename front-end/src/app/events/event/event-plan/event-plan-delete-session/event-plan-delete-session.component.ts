import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { SessionService } from '../../../../shared/services/http/session.service';
import { NotificationService } from '../../../../shared/services/interne/notification.service';
import { SpinnerService } from '../../../../shared/services/interne/spinner.service';

@Component({
  selector: 'app-event-plan-delete-session',
  templateUrl: './event-plan-delete-session.component.html',
  styleUrls: ['./event-plan-delete-session.component.scss']
})
export class EventPlanDeleteSessionComponent implements OnInit {

  constructor(public matDialogRef: MatDialogRef<EventPlanDeleteSessionComponent>,public dialog: MatDialog ,
              @Inject(MAT_DIALOG_DATA) private data: any , private sessionService :SessionService ,
              private notificationService : NotificationService , private spinnerService : SpinnerService ) { }

  ngOnInit() {
  }

  deleteSession() {
    this.spinnerService.activate() ;
    this.sessionService.deleteSession(this.data.id).subscribe(
      (res) => {
        this.data.day.sessions_list.splice(
          this.data.day.sessions_list.findIndex(s => {
            return  s.session_id == this.data.id
          }),1);
        this.notificationService.openSnackBar('Session deleted successfully' , 'green-snackbar') ;
        this.spinnerService.deactivate() ;
      },
      err => {
        this.notificationService.openSnackBar('Error when deleting session' , 'red-snackbar') ;
        this.spinnerService.deactivate() ;
      }
    );
    this.matDialogRef.close()
  }
}
