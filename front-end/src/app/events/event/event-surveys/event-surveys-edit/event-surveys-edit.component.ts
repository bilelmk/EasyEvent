import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from '../../../../shared/services/http/survey.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Survey } from '../../../../shared/classes/Survey';
import { NotificationService } from '../../../../shared/services/interne/notification.service';
import { SpinnerService } from '../../../../shared/services/interne/spinner.service';

@Component({
  selector: 'app-event-surveys-edit',
  templateUrl: './event-surveys-edit.component.html',
  styleUrls: ['./event-surveys-edit.component.scss']
})
export class EventSurveysEditComponent implements OnInit {

  updateForm : FormGroup ;

  constructor(private surveyService : SurveyService , @Inject(MAT_DIALOG_DATA) private data: Survey ,
              public matDialogRef: MatDialogRef<EventSurveysEditComponent> ,  private spinnerService : SpinnerService ,
              public dialog: MatDialog , private notificationService : NotificationService ) { }

  ngOnInit() {
    this.updateForm = new FormGroup({
      'title' : new FormControl(this.data.title, Validators.required ),
      'description' : new FormControl(this.data.description , Validators.required ),
      'star_number' : new FormControl(this.data.star_number, Validators.required ),
    });
  }

  updateSurvey() {
    this.spinnerService.activate() ;
    let updatedSurvey = this.updateForm.value ;
    updatedSurvey.survey_id = this.data.survey_id ;
    this.surveyService.putSurvey(updatedSurvey).subscribe(
      (res : Survey) => {
        this.data.title = res.title ;
        this.data.description = res.description ;
        this.data.star_number = res.star_number ;
        this.notificationService.openSnackBar('Survey updated successfully' , 'green-snackbar') ;
        this.spinnerService.deactivate() ;
      },
      err => {
        this.notificationService.openSnackBar('Error when updating survey' , 'red-snackbar') ;
        this.spinnerService.deactivate() ;
      });
    this.matDialogRef.close()
  }

}
