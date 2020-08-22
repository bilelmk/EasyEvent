import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { SpinnerService } from '../../shared/services/interne/spinner.service';
import { NotificationService } from '../../shared/services/interne/notification.service';
import { GroupService } from '../../shared/services/http/group.service';

@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.scss']
})
export class GroupAddComponent implements OnInit {

  groupForm : FormGroup;

  constructor(private groupService : GroupService ,private spinnerService : SpinnerService ,
              public matDialogRef: MatDialogRef<GroupAddComponent> , public dialog: MatDialog  ,
              private notificationService : NotificationService ) { }

  ngOnInit() {
    this.groupForm = new FormGroup({
      'name' : new FormControl(null , Validators.required ),
      'description' : new FormControl(null  ),
    });

  }

  addGroup() {
    this.spinnerService.activate() ;
    this.groupService.postGroup(this.groupForm.value).subscribe(
      (res ) => {
        this.notificationService.openSnackBar('Group added successfully' , 'green-snackbar') ;
        this.spinnerService.deactivate() ;
        this.matDialogRef.close(res)
      },
      err => {
        console.log(err) ;
        this.notificationService.openSnackBar('Error when adding group' , 'red-snackbar') ;
        this.spinnerService.deactivate() ;
      });

  }

}
