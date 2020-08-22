import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SurveyService } from '../../../../shared/services/http/survey.service';
import { SpinnerService} from '../../../../shared/services/interne/spinner.service';
import { NotificationService } from '../../../../shared/services/interne/notification.service';

@Component({
  selector: 'app-event-surveys-result',
  templateUrl: './event-surveys-result.component.html',
  styleUrls: ['./event-surveys-result.component.scss']
})
export class EventSurveysResultComponent implements OnInit {

  pieChartLabels = [ ];
  pieChartData = [ ];
  pieChartType = 'doughnut';

  constructor( private surveyService : SurveyService ,  @Inject(MAT_DIALOG_DATA) private data: any ,
               private spinnerService : SpinnerService  , private notificationService : NotificationService) {

  }

  ngOnInit() {
    // this.spinnerService.activate() ;
    this.surveyService.getSurveysResult(this.data.survey_id).subscribe(
      res => {
        this.pieChartLabels = res.map( el => el.name) ;
        this.pieChartData = res.map( el => el.value) ;
        // this.spinnerService.deactivate() ;
      } ,
      err => {
        console.log(err);
        // this.spinnerService.deactivate() ;
      }
    )

  }

}
