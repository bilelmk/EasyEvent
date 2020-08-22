import { Component, Inject, OnInit } from '@angular/core';
import { Session } from '../../../../shared/classes/Session';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { SessionService } from '../../../../shared/services/http/session.service';
import { NotificationService } from '../../../../shared/services/interne/notification.service';
import { SpinnerService } from '../../../../shared/services/interne/spinner.service';

@Component({
  selector: 'app-event-plan-edit-session',
  templateUrl: './event-plan-edit-session.component.html',
  styleUrls: ['./event-plan-edit-session.component.scss']
})
export class EventPlanEditSessionComponent implements OnInit {

  sessionForm : FormGroup ;

  constructor(public matDialogRef: MatDialogRef<EventPlanEditSessionComponent>,public dialog: MatDialog ,
              @Inject(MAT_DIALOG_DATA) private data: Session , private sessionService :SessionService,
              private notificationService : NotificationService ,  private spinnerService : SpinnerService) { }

  ngOnInit() {
    this.sessionForm = new FormGroup({
      'title' : new FormControl(this.data.title , Validators.required ),
      'description' : new FormControl(this.data.description , Validators.required ),
      'end_time' : new FormControl(this.data.end_time , Validators.required ),
      'start_time' : new FormControl(this.data.start_time , Validators.required ),
    });
  }

  updateSession() {
    this.spinnerService.activate() ;
    let updatedSession = this.sessionForm.value ;
    updatedSession.session_id = this.data.session_id ;
    this.sessionService.putSession(updatedSession).subscribe(
      (res : Session) => {
        // update session
        this.data.title = res.title ;
        this.data.description = res.description ;
        this.data.start_time = res.start_time ;
        this.data.end_time = res.end_time ;
        this.notificationService.openSnackBar('Session updated successfully' , 'green-snackbar') ;
        this.spinnerService.deactivate() ;
      },
      err => {
        this.notificationService.openSnackBar('Error when updating session' , 'red-snackbar') ;
        this.spinnerService.deactivate() ;
      }
    );
    this.matDialogRef.close()
  }

}
