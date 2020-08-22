import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { NotificationService } from '../../../../shared/services/interne/notification.service';
import { GoodyFeature } from '../../../../shared/classes/GoodyFeature';
import { GoodyService } from '../../../../shared/services/http/goody.service';
import { Goody } from '../../../../shared/classes/Goody';
import { EventGoodiesFeatureAddComponent } from '../event-goodies-feature-add/event-goodies-feature-add.component';
import { Event } from '../../../../shared/classes/Event';
import { SpinnerService } from '../../../../shared/services/interne/spinner.service';

@Component({
  selector: 'app-event-goodies-add',
  templateUrl: './event-goodies-add.component.html',
  styleUrls: ['./event-goodies-add.component.scss']
})
export class EventGoodiesAddComponent implements OnInit {

  addForm : FormGroup;
  feature_list : GoodyFeature[] = [] ;

  constructor(public matDialogRef: MatDialogRef<EventGoodiesAddComponent>, public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private data: any , private notificationService : NotificationService ,
              private goodyService : GoodyService , private spinnerService : SpinnerService ) {
  }

  ngOnInit() {
    this.addForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
    });
  }

  addGoody() {
    this.spinnerService.activate() ;
    let goody = new Goody();
    goody.name = this.addForm.value.name ;
    goody.feature_list = this.feature_list ;
    goody.event = new Event;
    goody.event.event_id = this.data.id;

    this.goodyService.postGoody( goody ).subscribe(
      (res: Goody) => {
        if(this.data.goodies){
          this.data.goodies.push(res)
        }
        else {
          this.data.goodies = [] ;
          this.data.goodies.push(res)
        }
        this.notificationService.openSnackBar('Goody added successfully' , 'green-snackbar') ;
        this.spinnerService.deactivate() ;
      },
      err => {
        console.log(err);
        this.notificationService.openSnackBar('Error when adding goody' , 'red-snackbar') ;
        this.spinnerService.deactivate() ;
      }
    );
    this.matDialogRef.close();
  }

  openAddFeaturesDialog() {
    const dialogRef = this.dialog.open( EventGoodiesFeatureAddComponent , {
      panelClass: 'custom-dialog-container' ,width: '800px', height: '600px' , data : this.feature_list
    });
  }
}
