import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from '../../../../shared/services/http/survey.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Survey } from '../../../../shared/classes/Survey';
import { Event } from '../../../../shared/classes/Event';
import { NotificationService } from '../../../../shared/services/interne/notification.service';
import { SpinnerService } from '../../../../shared/services/interne/spinner.service';

@Component({
  selector: 'app-event-surveys-add',
  templateUrl: './event-surveys-add.component.html',
  styleUrls: ['./event-surveys-add.component.scss']
})
export class EventSurveysAddComponent implements OnInit {

  surveyForm : FormGroup;

  constructor(private surveyService : SurveyService , @Inject(MAT_DIALOG_DATA) private data: any ,
              public matDialogRef: MatDialogRef<EventSurveysAddComponent> , private spinnerService : SpinnerService ,
              public dialog: MatDialog  , private notificationService : NotificationService ) { }

  ngOnInit() {
    this.surveyForm = new FormGroup({
      'title' : new FormControl(null , Validators.required ),
      'description' : new FormControl(null , Validators.required ),
      'star_number' : new FormControl(null , Validators.required ),
    });

  }

  addSurvey() {
    this.spinnerService.activate() ;

    let survey = new Survey ;
    survey.event = new Event ;
    survey.event.event_id = this.data.id ;
    survey.star_number = this.surveyForm.value.star_number ;
    survey.title = this.surveyForm.value.title ;
    survey.description = this.surveyForm.value.description ;

    this.surveyService.postSurvey(survey).subscribe(
      (res : Survey) => {
        if(this.data.surveys) {
          this.data.surveys.push(res)
        }
        else{
          this.data.surveys = [] ;
          this.data.surveys.push(res)
        }
        this.notificationService.openSnackBar('Survey added successfully' , 'green-snackbar') ;
        this.spinnerService.deactivate() ;
      },
      err => {
        console.log(err) ;
        this.notificationService.openSnackBar('Error when adding survey' , 'red-snackbar') ;
        this.spinnerService.deactivate() ;
      });
    this.matDialogRef.close()
  }

}
