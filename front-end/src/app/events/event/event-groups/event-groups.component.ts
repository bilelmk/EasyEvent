import { Component, OnInit } from '@angular/core';
import {Event} from '../../../shared/classes/Event';
import {Invitation} from '../../../shared/classes/Invitation';
import {MatTableDataSource} from '@angular/material';
import {InvitationService} from '../../../shared/services/http/invitation.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ExistEventService} from '../../../shared/services/interne/exist-event.service';
import {NotificationService} from '../../../shared/services/interne/notification.service';

@Component({
  selector: 'app-event-groups',
  templateUrl: './event-groups.component.html',
  styleUrls: ['./event-groups.component.scss']
})
export class EventGroupsComponent implements OnInit {

  existEvent : Event ;
  invitations : Invitation[] = null ;
  public dataSource = new MatTableDataSource<Invitation>();
  displayedColumns = ['first_name', 'last_name' , 'email' , 'phone' , 'group' , 'status'  ];

  constructor(private  invitationService : InvitationService , private spinner: NgxSpinnerService , private existEventService : ExistEventService ,
              private notificationService : NotificationService) {}


  ngOnInit()  {
    // this.spinner.show() ;

    this.existEvent = this.existEventService.getExistEvent() ;

    this.invitationService.getAcceptedInvitations(this.existEvent.event_id).subscribe(
      res =>{
        this.invitations = res ;
        this.dataSource = new MatTableDataSource<Invitation>(this.invitations);
      },
      err => {
        console.log(err) ;
      }
    )
  }


  setGroups(){
    this.invitationService.putInvitations(this.invitations).subscribe(
      res => {
        this.notificationService.openSnackBar('Groups set successfully' , 'green-snackbar')
      },
      err => {
        this.notificationService.openSnackBar('Error when setting invitations' , 'red-snackbar')
      })
  }

  setRamdomGroups() {

  }
}
