import { Component, Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { SubSession } from '../../../shared/classes/SubSession';
import { Session } from '../../../shared/classes/Session';

@Component({
  selector: 'app-create-event-plan-subsession',
  templateUrl: './create-event-plan-subsession.component.html',
  styleUrls: ['./create-event-plan-subsession.component.scss']
})
export class CreateEventPlanSubsessionComponent implements OnInit {

  subsessionForm : FormGroup ;

  constructor(@Inject(MAT_DIALOG_DATA) private data: Session , public matDialogRef: MatDialogRef<CreateEventPlanSubsessionComponent>) { }

  ngOnInit() {
    this.subsessionForm = new FormGroup({
      'title' : new FormControl(null , Validators.required ),
      'description' : new FormControl(null , Validators.required ),
      'end_time' : new FormControl(null , Validators.required ),
      'start_time' : new FormControl(null , Validators.required ),

    });
  }

  addSubSession() {
    let subSession : SubSession = this.subsessionForm.value ;
    // Update event day by adding the session
    if(this.data.subSessions_list) {
      this.data.subSessions_list.push(subSession) ;
    }
    else {
      this.data.subSessions_list = [] ;
      this.data.subSessions_list.push(subSession) ;
    }
    this.matDialogRef.close()
  }

}
