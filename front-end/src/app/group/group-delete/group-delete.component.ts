import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {SpinnerService} from '../../shared/services/interne/spinner.service';
import {NotificationService} from '../../shared/services/interne/notification.service';
import {GroupService} from '../../shared/services/http/group.service';

@Component({
  selector: 'app-group-delete',
  templateUrl: './group-delete.component.html',
  styleUrls: ['./group-delete.component.scss']
})
export class GroupDeleteComponent implements OnInit {

  constructor(private groupService : GroupService , @Inject(MAT_DIALOG_DATA) private data: any ,
              public matDialogRef: MatDialogRef<GroupDeleteComponent> , private spinnerService : SpinnerService ,
              public dialog: MatDialog , private notificationService : NotificationService ) { }

  ngOnInit() {
  }

  deleteGroup() {
    this.spinnerService.activate() ;
    this.groupService.deleteGroup(this.data).subscribe(
      res => {
        this.notificationService.openSnackBar('Group deleted successfully' , 'green-snackbar') ;
        this.spinnerService.deactivate() ;
        this.matDialogRef.close(true)
      },
      err => {
        console.log(err) ;
        this.notificationService.openSnackBar('Error when deleting group' , 'red-snackbar') ;
        this.spinnerService.deactivate() ;
      });

  }

}
