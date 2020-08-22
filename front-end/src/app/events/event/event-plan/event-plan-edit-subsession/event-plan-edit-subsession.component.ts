import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { SubsessionService } from '../../../../shared/services/http/subsession.service';
import { SubSession } from '../../../../shared/classes/SubSession';
import { Session } from '../../../../shared/classes/Session';
import { NotificationService } from '../../../../shared/services/interne/notification.service';
import { SpinnerService } from '../../../../shared/services/interne/spinner.service';

@Component({
  selector: 'app-event-plan-edit-subsession',
  templateUrl: './event-plan-edit-subsession.component.html',
  styleUrls: ['./event-plan-edit-subsession.component.scss']
})
export class EventPlanEditSubsessionComponent implements OnInit {

  subsessionForm: FormGroup;

  constructor(private subSessionService : SubsessionService ,public matDialogRef: MatDialogRef<EventPlanEditSubsessionComponent>,
              public dialog: MatDialog , @Inject(MAT_DIALOG_DATA) private data: SubSession ,
              private notificationService : NotificationService , private spinnerService : SpinnerService ) { }


  ngOnInit() {
    this.subsessionForm = new FormGroup({
      'title' : new FormControl(this.data.title , Validators.required ),
      'description' : new FormControl(this.data.description , Validators.required ),
      'end_time' : new FormControl(this.data.end_time , Validators.required ),
      'start_time' : new FormControl(this.data.start_time , Validators.required ),

    });
  }

  updateSubSession() {
    this.spinnerService.activate() ;
    let updatedSubSession : SubSession = this.subsessionForm.value ;
    updatedSubSession.subsession_id = this.data.subsession_id ;
    this.subSessionService.putSubSession(updatedSubSession).subscribe(
      (res : Session) => {
        // update session
        this.data.title = res.title ;
        this.data.description = res.description ;
        this.data.start_time = res.start_time ;
        this.data.end_time = res.end_time ;
        this.notificationService.openSnackBar('Subsession updated successfully' , 'green-snackbar') ;
        this.spinnerService.deactivate() ;
      },
      err => {
        this.notificationService.openSnackBar('Error when updating subsession' , 'red-snackbar') ;
        this.spinnerService.deactivate() ;
      }
    );
    this.matDialogRef.close()
  }
}
