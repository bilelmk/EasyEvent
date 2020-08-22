import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { SpinnerService } from '../../shared/services/interne/spinner.service';
import { NotificationService } from '../../shared/services/interne/notification.service';
import { GroupService } from '../../shared/services/http/group.service';
import { Group } from '../../shared/classes/Group';

@Component({
  selector: 'app-group-update',
  templateUrl: './group-update.component.html',
  styleUrls: ['./group-update.component.scss']
})
export class GroupUpdateComponent implements OnInit {

  updateForm : FormGroup ;

  constructor(private groupService : GroupService , @Inject(MAT_DIALOG_DATA) private data: Group ,
              public matDialogRef: MatDialogRef<GroupUpdateComponent> ,  private spinnerService : SpinnerService ,
              public dialog: MatDialog , private notificationService : NotificationService ) { }

  ngOnInit() {
    this.updateForm = new FormGroup({
      'name' : new FormControl(this.data.name, Validators.required ),
      'description' : new FormControl(this.data.description),
    });
  }

  updateGroup() {
    this.spinnerService.activate() ;
    let updatedGroup = this.updateForm.value ;
    updatedGroup.group_id = this.data.group_id ;
    this.groupService.putGroup(updatedGroup).subscribe(
      (res : Group) => {
        this.data.name = res.name ;
        this.data.description = res.description ;
         this.notificationService.openSnackBar('Group updated successfully' , 'green-snackbar') ;
        this.spinnerService.deactivate() ;
      },
      err => {
        this.notificationService.openSnackBar('Error when updating group' , 'red-snackbar') ;
        this.spinnerService.deactivate() ;
      });
    this.matDialogRef.close()
  }

}
