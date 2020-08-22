import { Component, Inject, OnInit } from '@angular/core';
import { SurveyService }  from '../../../../shared/services/http/survey.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { NotificationService } from '../../../../shared/services/interne/notification.service';
import { SpinnerService } from '../../../../shared/services/interne/spinner.service';

@Component({
  selector: 'app-event-surveys-delete',
  templateUrl: './event-surveys-delete.component.html',
  styleUrls: ['./event-surveys-delete.component.scss']
})
export class EventSurveysDeleteComponent implements OnInit {

  constructor(private surveyService : SurveyService , @Inject(MAT_DIALOG_DATA) private data: any ,
              public matDialogRef: MatDialogRef<EventSurveysDeleteComponent> , private spinnerService : SpinnerService ,
              public dialog: MatDialog , private notificationService : NotificationService ) { }

  ngOnInit() {
  }

  deleteSurvey() {
    this.spinnerService.activate() ;
    this.surveyService.deleteSurvey(this.data.id).subscribe(
      res => {
        this.data.surveys.splice(
            this.data.surveys.findIndex(survey => {
              return  survey.survey_id == this.data.id
            }),1);
        this.notificationService.openSnackBar('Survey deleted successfully' , 'green-snackbar') ;
        this.spinnerService.deactivate() ;
      },
      err => {
        console.log(err) ;
        this.notificationService.openSnackBar('Error when deleting survey' , 'red-snackbar') ;
        this.spinnerService.deactivate() ;
      });
    this.matDialogRef.close()
  }

}
