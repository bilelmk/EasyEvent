import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { SubsessionService } from '../../../../shared/services/http/subsession.service';
import { NotificationService } from '../../../../shared/services/interne/notification.service';
import { SpinnerService } from '../../../../shared/services/interne/spinner.service';

@Component({
  selector: 'app-event-plan-delete-subsession',
  templateUrl: './event-plan-delete-subsession.component.html',
  styleUrls: ['./event-plan-delete-subsession.component.scss']
})
export class EventPlanDeleteSubsessionComponent implements OnInit {

  constructor(public matDialogRef: MatDialogRef<EventPlanDeleteSubsessionComponent>,public dialog: MatDialog ,
              @Inject(MAT_DIALOG_DATA) private data: any , private subSessionService : SubsessionService ,
              private notificationService : NotificationService , private spinnerService : SpinnerService ) { }

  ngOnInit() {
  }

  deleteSubSession() {
    this.spinnerService.activate() ;
    this.subSessionService.deleteSubSession(this.data.id).subscribe(
      (res) => {
        this.data.session.subSessions_list.splice(
          this.data.session.subSessions_list.findIndex(s => {
            return  s.subsession_id == this.data.id
          },1)
        );
        this.notificationService.openSnackBar('SubSession deleted successfully' , 'green-snackbar') ;
        this.spinnerService.deactivate() ;
      },
      err => {
        this.notificationService.openSnackBar('Error when deleting subsession' , 'red-snackbar') ;
        this.spinnerService.deactivate() ;
      }
    );
    this.matDialogRef.close()
  }

}
