import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Session } from '../../../../shared/classes/Session';
import { SessionService } from '../../../../shared/services/http/session.service';
import { NotificationService } from '../../../../shared/services/interne/notification.service';
import {SpinnerService} from '../../../../shared/services/interne/spinner.service';

@Component({
  selector: 'app-event-plan-add-subsession',
  templateUrl: './event-plan-add-subsession.component.html',
  styleUrls: ['./event-plan-add-subsession.component.scss']
})
export class EventPlanAddSubsessionComponent implements OnInit {

  subsessionForm : FormGroup ;

  constructor(public matDialogRef: MatDialogRef<EventPlanAddSubsessionComponent>,public dialog: MatDialog ,
              @Inject(MAT_DIALOG_DATA) private data: Session , private sessionService : SessionService ,
              private notificationService : NotificationService , private spinnerService : SpinnerService) { }

  ngOnInit() {
    this.subsessionForm = new FormGroup({
      'title' : new FormControl(null , Validators.required ),
      'description' : new FormControl(null , Validators.required ),
      'end_time' : new FormControl(null , Validators.required ),
      'start_time' : new FormControl(null , Validators.required ),
    });
  }

  addSubSession() {
    this.spinnerService.activate() ;
    this.sessionService.addSubSessionToSession(this.data.session_id , this.subsessionForm.value).subscribe(
      (res : Session)  => {
        this.data.subSessions_list = res.subSessions_list ;
        this.notificationService.openSnackBar('SubSession added successfully' , 'green-snackbar') ;
        this.spinnerService.deactivate() ;
      },
      err => {
        this.notificationService.openSnackBar('Error when adding subsession' , 'red-snackbar') ;
        this.spinnerService.deactivate() ;
      }
    );
    this.matDialogRef.close() ;
  }



}
