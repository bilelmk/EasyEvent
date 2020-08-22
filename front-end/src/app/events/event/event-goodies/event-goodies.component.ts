import { Component, OnInit } from '@angular/core';
import { Event } from '../../../shared/classes/Event';
import { ExistEventService } from '../../../shared/services/interne/exist-event.service';
import { MatDialog } from '@angular/material';
import { GoodyService } from '../../../shared/services/http/goody.service';
import { Goody } from '../../../shared/classes/Goody';
import { EventGoodiesAddComponent } from './event-goodies-add/event-goodies-add.component';
import { EventGoodiesEditComponent } from './event-goodies-edit/event-goodies-edit.component';
import { EventGoodiesDeleteComponent } from './event-goodies-delete/event-goodies-delete.component';
import { EventGoodiesResultComponent } from './event-goodies-result/event-goodies-result.component';

import { SpinnerService } from '../../../shared/services/interne/spinner.service';
import { GoodyFeature } from '../../../shared/classes/GoodyFeature';
import { GoodyOption } from '../../../shared/classes/GoodyOption';

@Component({
  selector: 'app-event-goodies',
  templateUrl: './event-goodies.component.html',
  styleUrls: ['./event-goodies.component.scss']
})
export class EventGoodiesComponent implements OnInit {

  existEvent : Event ;
  goodies : Goody[] = [] ;
  error = false ;

  constructor(private existEventService : ExistEventService , public dialog: MatDialog , private goodyService : GoodyService ,
              private spinnerService : SpinnerService) { }

  ngOnInit() {
    this.spinnerService.activate() ;
    this.existEvent = this.existEventService.getExistEvent();
    this.goodyService.getGoodiesByEventId(this.existEvent.event_id).subscribe(
      res => {
        this.goodies = res ;
        this.spinnerService.deactivate() ;
      },
      err => {
        this.spinnerService.deactivate() ;
        this.error = true ;
        console.log(err)
      })
  }

  deleteFeature(goody_feature_id: number, feature_list: GoodyFeature[]) {
    this.spinnerService.activate() ;
    this.goodyService.deleteGoodyFeature(goody_feature_id).subscribe(
      res => {
        feature_list.splice(feature_list.findIndex(feature => {
          return feature.goody_feature_id == goody_feature_id ;
        }),1);
        this.spinnerService.deactivate() ;
      },
      err => {
        this.spinnerService.deactivate() ;
        console.log(err)
      })
  }

  deleteOption(goody_option_id: number, option_list: GoodyOption[]) {
    this.spinnerService.activate() ;
    this.goodyService.deleteGoodyOption(goody_option_id).subscribe(
      res => {
        option_list.splice(option_list.findIndex(option => {
          return option.goody_option_id == goody_option_id ;
        }),1);
        console.log(res)
        this.spinnerService.deactivate() ;
      },
      err => {
        this.spinnerService.deactivate() ;
        console.log(err)
      })
  }

  openAddGoodyDialog(): void {
    const dialogRef = this.dialog.open( EventGoodiesAddComponent, {
      panelClass: 'custom-dialog-container' , width: '800px', height: '600px' ,  data : { 'id' : this.existEvent.event_id , 'goodies' : this.goodies }
    });
  }

  openUpdateGoodyDialog(goody: Goody): void {
    const dialogRef = this.dialog.open( EventGoodiesEditComponent, {
      panelClass: 'custom-dialog-container' ,width: '800px', height: '600px' , data : goody
    });
  }

  openDeleteGoodyDialog(goody_id: any) {
    const dialogRef = this.dialog.open(EventGoodiesDeleteComponent, {
      panelClass: 'custom-dialog-container' , width: '800px', height: '400px' , data :{ 'id' : goody_id, 'goodies' : this.goodies }
    });
  }

  openGoodiesChoicesDialog(goody_id: any) {
    const dialogRef = this.dialog.open(EventGoodiesResultComponent, {
      panelClass: 'custom-dialog-container' , width: '800px', height: '400px', data : goody_id
    });
  }

  resolve(){
    if(this.error === true ){
      return null ;
    }
    else if(this.goodies.length == 0 ){
      return 'nodata' ;
    }
    return 'data'
  }

  openAddVoteFeatureDialog() {

  }


}
