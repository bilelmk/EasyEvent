import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { EventdayService } from '../../../../shared/services/http/eventday.service';
import { EventDay } from '../../../../shared/classes/EventDay';
import { NotificationService } from '../../../../shared/services/interne/notification.service';
import { SpinnerService } from '../../../../shared/services/interne/spinner.service';

@Component({
  selector: 'app-event-plan-add-session',
  templateUrl: './event-plan-add-session.component.html',
  styleUrls: ['./event-plan-add-session.component.scss']
})
export class EventPlanAddSessionComponent implements OnInit {

  sessionForm: FormGroup;

  constructor(public matDialogRef: MatDialogRef<EventPlanAddSessionComponent>, public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private data: EventDay, private eventDayService: EventdayService,
              private notificationService : NotificationService , private spinnerService : SpinnerService ) {
  }

  ngOnInit() {
    this.sessionForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null),
      'end_time': new FormControl(null, Validators.required),
      'start_time': new FormControl(null, Validators.required),
    });
  }

  addSession() {
    this.spinnerService.activate() ;
    this.eventDayService.addSessionToEventDay(this.data.day_id, this.sessionForm.value).subscribe(
      (res: EventDay) => {
        this.data.sessions_list = res.sessions_list;
        this.notificationService.openSnackBar('Session added successfully' , 'green-snackbar') ;
        this.spinnerService.deactivate() ;
      },
      err => {
        this.notificationService.openSnackBar('Error when adding session' , 'red-snackbar') ;
        this.spinnerService.deactivate() ;
      }
    );
    this.matDialogRef.close();
  }
}
