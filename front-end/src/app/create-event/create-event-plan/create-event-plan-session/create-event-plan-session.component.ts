import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Session } from '../../../shared/classes/Session';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EventDay } from '../../../shared/classes/EventDay';

@Component({
  selector: 'app-create-event-plan-session',
  templateUrl: './create-event-plan-session.component.html',
  styleUrls: ['./create-event-plan-session.component.scss']
})
export class CreateEventPlanSessionComponent implements OnInit {

  sessionForm : FormGroup ;

  constructor(public matDialogRef: MatDialogRef<CreateEventPlanSessionComponent>,
              @Inject(MAT_DIALOG_DATA) private data: EventDay) { }

  ngOnInit() {
    this.sessionForm = new FormGroup({
      'title' : new FormControl(null , Validators.required ),
      'description' : new FormControl(null , Validators.required ),
      'end_time' : new FormControl(null , Validators.required ),
      'start_time' : new FormControl(null , Validators.required ),
    });
  }

  addSession() {
    let session : Session = this.sessionForm.value ;
    // Update event day by adding the session
    if(this.data.sessions_list) {
      this.data.sessions_list.push(session) ;
    }
    else {
      this.data.sessions_list = [] ;
      this.data.sessions_list.push(session) ;
    }
    this.matDialogRef.close()
  }

}
