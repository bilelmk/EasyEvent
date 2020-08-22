import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { SpinnerService } from '../../../../shared/services/interne/spinner.service';
import { NotificationService } from '../../../../shared/services/interne/notification.service';
import { GoodyService } from '../../../../shared/services/http/goody.service';

@Component({
  selector: 'app-event-goodies-delete',
  templateUrl: './event-goodies-delete.component.html',
  styleUrls: ['./event-goodies-delete.component.scss']
})
export class EventGoodiesDeleteComponent implements OnInit {

  constructor(private goodyService : GoodyService , @Inject(MAT_DIALOG_DATA) private data: any ,
              public matDialogRef: MatDialogRef<EventGoodiesDeleteComponent> , private spinnerService : SpinnerService ,
              public dialog: MatDialog , private notificationService : NotificationService ) { }

  ngOnInit() {
  }

  deleteGoody() {
    this.spinnerService.activate() ;
    this.goodyService.deleteGoody(this.data.id).subscribe(
      res => {
        this.data.goodies.splice(
          this.data.goodies.findIndex(goody => {
            return  goody.goody_id == this.data.id
          }),1);
        this.notificationService.openSnackBar('Goody deleted successfully' , 'green-snackbar') ;
        this.spinnerService.deactivate() ;
      },
      err => {
        console.log(err) ;
        this.notificationService.openSnackBar('Error when deleting goody' , 'red-snackbar') ;
        this.spinnerService.deactivate() ;
      });
    this.matDialogRef.close()
  }

}
