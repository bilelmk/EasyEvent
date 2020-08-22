import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { NotificationService } from '../../../../shared/services/interne/notification.service';
import { GoodyFeature } from '../../../../shared/classes/GoodyFeature';
import {GoodyOption} from '../../../../shared/classes/GoodyOption';

@Component({
  selector: 'app-event-goodies-feature-add',
  templateUrl: './event-goodies-feature-add.component.html',
  styleUrls: ['./event-goodies-feature-add.component.scss']
})
export class EventGoodiesFeatureAddComponent implements OnInit {

  addForm : FormGroup;
  feature : GoodyFeature = new GoodyFeature() ;

  constructor(public matDialogRef: MatDialogRef<EventGoodiesFeatureAddComponent>, public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private data: any , private notificationService : NotificationService ) {
  }

  ngOnInit() {
    this.addForm = new FormGroup({
      'feature_name': new FormControl(null, Validators.required),
    });
  }

  addFeature() {
    this.feature.feature_name = this.addForm.value.feature_name ;
    if(this.data) {
      this.data.push(this.feature)  ;
    }
    else{
      this.data=[] ;
      this.data.push(this.feature) ;
    }
    this.notificationService.openSnackBar("Feature added successfully" , "green-snackbar") ;
    this.matDialogRef.close();
  }

  addOption(option_name) {
    let option = new GoodyOption();
    option.option_name = option_name.value

    if(this.feature.option_list) {
      this.feature.option_list.push(option)
    }
    else {
      this.feature.option_list = [] ;
      this.feature.option_list.push(option)
    }

    this.notificationService.openSnackBar("Option added successfully" , "green-snackbar")
    option_name.value = null ;
  }

}
