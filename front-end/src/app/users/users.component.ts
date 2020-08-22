import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/http/user.service';
import { User } from '../shared/classes/User';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { UsersDeleteComponent } from './users-delete/users-delete.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersAddFromcsvComponent } from './users-add-fromcsv/users-add-fromcsv.component';
import { SpinnerService } from '../shared/services/interne/spinner.service';
import { GroupService } from '../shared/services/http/group.service';
import { Group } from '../shared/classes/Group';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users : User[] = [] ;
  groups : Group[] = [] ;

  public dataSource = new MatTableDataSource<User>();
  displayedColumns = ['first_name', 'last_name' , 'email' , 'phone' , 'buttons' ];
  ishidden = false ;

  filter = "" ;
  page = 0 ;
  size = 10 ;
  group_id = 1 ;

  constructor(private userService : UserService , public dialog: MatDialog , private spinnerService: SpinnerService ,
              private groupService : GroupService) {}


  ngOnInit()  {
    this.spinnerService.activate();
    this.groupService.getGroups().subscribe(
      res =>{
        this.groups = res ;
        if(this.groups[0]) {
          this.group_id = this.groups[0].group_id ;
          this.searchUsers() ;
        }
        this.spinnerService.deactivate();
      },
      err => {
        console.log(err) ;
        this.users = null ;
        this.spinnerService.deactivate();
      }
    );

  }


  searchUsers() {
    this.spinnerService.activate();
    this.userService.searchUsers(this.group_id , this.page , this.size , this.filter ).subscribe(
      res =>{
        this.users = res ;
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.spinnerService.deactivate();
      },
      err => {
        console.log(err) ;
        this.users = null ;
        this.spinnerService.deactivate();
      }
    )
  }

  applyFilter(event) {
    this.filter = (event.target as HTMLInputElement).value;
    this.searchUsers()
  }

  openSearch() {
    this.ishidden = true

  }

  closeSearch() {
    this.ishidden = false ;
    this.filter = "" ;
  }

  resolve(){
    if(this.users == null ){
      return null;
    }
    else if(this.users.length == 0 ){
      return 'nodata' ;
    }
    return 'data'
  }

  openDeleteDialog(user_id: any) {
    const dialogRef = this.dialog.open( UsersDeleteComponent, {
     panelClass: 'custom-dialog-container' , width: '800px' , height : '780px' , data : user_id
    });
  }


  openAddDialog() {
    const dialogRef = this.dialog.open( UsersAddComponent, {
      panelClass: 'custom-dialog-container' , width: '800px' , height : '780px' , data : this.group_id
    });
  }

  openAddFronCSVDialog() {
    const dialogRef = this.dialog.open( UsersAddFromcsvComponent, {
      panelClass: 'custom-dialog-container' , width: '800px' , height : '750px' , data : this.group_id
    });
  }

  selectGroup(event) {
    this.group_id = event.value;
    this.searchUsers()
  }
}
