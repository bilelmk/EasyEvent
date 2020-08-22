import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Event } from '../../../shared/classes/Event' ;
import { ExistEventService } from '../../../shared/services/interne/exist-event.service';
import { Invitation } from '../../../shared/classes/Invitation';
import { InvitationService } from '../../../shared/services/http/invitation.service';
import { NotificationService } from '../../../shared/services/interne/notification.service';
import { SpinnerService } from '../../../shared/services/interne/spinner.service';

@Component({
  selector: 'app-event-attendees',
  templateUrl: './event-attendees.component.html',
  styleUrls: ['./event-attendees.component.scss']
})
export class EventAttendeesComponent implements OnInit {

  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator ;

  existEvent : Event ;
  invitations : Invitation[] = [] ;
  public dataSource = new MatTableDataSource<Invitation>();
  displayedColumns = ['first_name', 'last_name' , 'email' , 'phone' , 'status' , 'checkbox' ];

  ishidden = false ;

  constructor(private  invitationService : InvitationService , private existEventService : ExistEventService ,
              private notificationService : NotificationService , private spinnerService : SpinnerService) {}

  openSearch() {
    this.ishidden = true

  }

  closeSearch() {
    this.ishidden = false
  }

  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit()  {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.user.first_name.toLowerCase().includes(filter) || data.user.last_name.toLowerCase().includes(filter);
    };

    this.spinnerService.activate() ;
    this.existEvent = this.existEventService.getExistEvent() ;
    this.invitationService.getInvitationsByEvent(this.existEvent.event_id).subscribe(
      res =>{
        this.invitations = res ;
        console.log(res)
        this.dataSource.data= this.invitations;
        this.dataSource.paginator = this.paginator;
        this.spinnerService.deactivate() ;
      },
      err => {
        console.log(err) ;
        this.spinnerService.deactivate() ;
      }
    )
  }

  selectAll() {
    this.invitations.map(inv => {
      if(inv.status == "not invited")
      inv.status = 'invited' ;
    })
  }

  sendInvitations(){
    this.spinnerService.activate() ;
    this.invitationService.putInvitations(this.invitations).subscribe(
      res => {
        this.notificationService.openSnackBar('Invitations sended successfully' , 'green-snackbar') ;
        this.spinnerService.deactivate() ;
      },
      err => {
        this.notificationService.openSnackBar('Error when sending invitations' , 'red-snackbar') ;
        this.spinnerService.deactivate() ;
      })

  }


  inviteUser(invitation) {
    if(invitation.status == 'not invited'){
        invitation.status = 'invited'
    }
    else if (invitation.status == 'invited') {
      invitation.status  = 'not invited'
    }
  }

  resolve(){
    if(this.invitations == null ){
      return null;
    }
    else if(this.invitations.length == 0 ){
      return 'nodata' ;
    }
    return 'data'
  }

}
