import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { NotificationService } from '../../../shared/services/interne/notification.service';
import { SpinnerService } from '../../../shared/services/interne/spinner.service';
import { Room } from '../../../shared/classes/Room';
import { ExistEventService } from '../../../shared/services/interne/exist-event.service';
import { Event } from '../../../shared/classes/Event' ;
import { RoomService } from '../../../shared/services/http/room.service';

@Component({
  selector: 'app-event-rooms',
  templateUrl: './event-rooms.component.html',
  styleUrls: ['./event-rooms.component.scss']
})
export class EventRoomsComponent implements OnInit {

  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator ;

  rooms : Room[] = [] ;
  public dataSource = new MatTableDataSource<Room>();
  displayedColumns = ['user1', 'user2' , 'user3' , 'name' ];
  existEvent : Event ;
  ishidden = false ;

  constructor(private notificationService : NotificationService , private spinnerService : SpinnerService ,
              private existEventService : ExistEventService , private roomService : RoomService  ) {}

  // openSearch() {
  //   this.ishidden = true
  //
  // }
  //
  // closeSearch() {
  //   this.ishidden = false
  // }
  //
  // applyFilter(event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  ngOnInit()  {
    // this.dataSource.filterPredicate = function(data, filter: string): boolean {
    //   return data.user.first_name.toLowerCase().includes(filter) || data.user.last_name.toLowerCase().includes(filter);
    // };

    this.spinnerService.activate() ;
    this.existEvent = this.existEventService.getExistEvent() ;
    this.roomService.getRooms(this.existEvent.event_id).subscribe(
      res =>{
        console.log(res)
        this.rooms = res ;
        this.dataSource.data= this.rooms;
        this.dataSource.paginator = this.paginator;
        this.spinnerService.deactivate() ;
      },
      err => {
        console.log(err) ;
        this.spinnerService.deactivate() ;
      }
    )
  }






  resolve(){
    if(this.rooms == null ){
      return null;
    }
    else if(this.rooms.length == 0 ){
      return 'nodata' ;
    }
    return 'data'
  }

  setRooms() {

  }
}
