import { Component, OnInit } from '@angular/core';
import { Survey } from '../../../shared/classes/Survey';
import { ExistEventService } from '../../../shared/services/interne/exist-event.service';
import { MatDialog } from '@angular/material';
import { SurveyService } from '../../../shared/services/http/survey.service';
import { Event } from '../../../shared/classes/Event';
import { EventSurveysResultComponent } from './event-surveys-result/event-surveys-result.component';
import { EventSurveysEditComponent } from './event-surveys-edit/event-surveys-edit.component';
import { EventSurveysDeleteComponent } from './event-surveys-delete/event-surveys-delete.component';
import { EventSurveysAddComponent } from './event-surveys-add/event-surveys-add.component';
import { SpinnerService } from '../../../shared/services/interne/spinner.service';

@Component({
  selector: 'app-event-surveys',
  templateUrl: './event-surveys.component.html',
  styleUrls: ['./event-surveys.component.scss']
})
export class EventSurveysComponent implements OnInit {

  existEvent : Event ;
  surveys : Survey[] = [] ;
  error = false ;

  constructor(private existEventService : ExistEventService , public dialog: MatDialog , private surveyService: SurveyService ,
              private spinnerService : SpinnerService) { }

  ngOnInit() {
    this.spinnerService.activate() ;
    this.existEvent = this.existEventService.getExistEvent();
    this.surveyService.getSurveysByEventId(this.existEvent.event_id).subscribe(
      res => {
        this.surveys = res ;
        this.spinnerService.deactivate() ;
      },
      err => {
        console.log(err) ;
        this.error = true ;
        this.spinnerService.deactivate() ;
      })
  }

  openAddSurveyDialog(): void {
    const dialogRef = this.dialog.open(EventSurveysAddComponent, {
      panelClass: 'custom-dialog-container' , width: '800px', height: '600px' ,  data : { 'id' : this.existEvent.event_id , 'surveys' : this.surveys }
    });
    dialogRef.afterClosed().subscribe()
  }

  openUpdateSurveyDialog(survey: Survey): void {
    const dialogRef = this.dialog.open(EventSurveysEditComponent, {
      panelClass: 'custom-dialog-container' ,width: '800px', height: '600px' , data : survey
    });
  }

  openSurveyResultDialog(survey : Survey): void {
    const dialogRef = this.dialog.open(EventSurveysResultComponent, {
      panelClass: 'custom-dialog-container' ,width: '800px', height: '600px' , data : survey
    });
  }

  openDeleteSurveyDialog(survey_id: any) {
    const dialogRef = this.dialog.open(EventSurveysDeleteComponent, {
      panelClass: 'custom-dialog-container' , width: '800px', height: '400px' , data :{ 'id' : survey_id, 'surveys' : this.surveys }
    });

  }

  getRange(rating: number) {
    return [...Array(rating).keys()]
  }

  resolve(){
    if(this.error === true ){
      return null ;
    }
    else if(this.surveys.length == 0 ){
      return 'nodata' ;
    }
    return 'data'
  }

}
