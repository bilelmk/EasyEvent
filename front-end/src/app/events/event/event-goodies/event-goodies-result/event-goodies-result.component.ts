import { Component, Inject, OnInit} from '@angular/core';
import { GoodyService} from '../../../../shared/services/http/goody.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import { SpinnerService} from '../../../../shared/services/interne/spinner.service';
import { NotificationService} from '../../../../shared/services/interne/notification.service';

@Component({
  selector: 'app-event-goodies-result',
  templateUrl: './event-goodies-result.component.html',
  styleUrls: ['./event-goodies-result.component.scss']
})
export class EventGoodiesResultComponent implements OnInit {

  constructor(private goodyService : GoodyService , @Inject(MAT_DIALOG_DATA) private data: any ,
              public matDialogRef: MatDialogRef<EventGoodiesResultComponent> , private spinnerService : SpinnerService ,
              public dialog: MatDialog , private notificationService : NotificationService ) { }

  ngOnInit() {
    // this.spinnerService.activate() ;
    this.goodyService.getGoodyResult(this.data).subscribe(
      res => {
        // this.notificationService.openSnackBar('Goody deleted successfully' , 'green-snackbar') ;
        console.log(res)
        // this.spinnerService.deactivate() ;
      },
      err => {
        console.log(err) ;
        this.notificationService.openSnackBar('Error when fetching result' , 'red-snackbar') ;
        // this.spinnerService.deactivate() ;
      });
  }

}
