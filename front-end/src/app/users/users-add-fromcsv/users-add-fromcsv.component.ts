import {Component, Inject, OnInit} from '@angular/core';
import { User} from '../../shared/classes/User';
import { UserService } from '../../shared/services/http/user.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {SpinnerService} from '../../shared/services/interne/spinner.service';
import {NotificationService} from '../../shared/services/interne/notification.service';
import {Group} from '../../shared/classes/Group';

@Component({
  selector: 'app-users-add-fromcsv',
  templateUrl: './users-add-fromcsv.component.html',
  styleUrls: ['./users-add-fromcsv.component.scss']
})
export class UsersAddFromcsvComponent {

  users : User[] = null ;
  csvContent: string;

  constructor(private userService : UserService , @Inject(MAT_DIALOG_DATA) private data: number ,
              public matDialogRef: MatDialogRef<UsersAddFromcsvComponent> , private spinnerService : SpinnerService ,
              public dialog: MatDialog , private notificationService : NotificationService ) { }

  public dataSource = new MatTableDataSource<User>();
  displayedColumns = [ 'first_name', 'last_name' , 'email' , 'phone' ] ;

  onFileLoad(fileLoadedEvent) {
    this.csvContent = fileLoadedEvent.target.result;
    const regex = /"/gi;
    let tab= new RegExp('[\n]');
    let users = [] ;
    this.csvContent.split(tab).map( res => {
      if(res != ""){
        let tab = res.split(",")
        let user = new User ;
        user.first_name = tab[0].replace(regex, '').trim();
        user.last_name = tab[1].replace(regex, '').trim();
        user.roles = tab[2].replace(regex, '').trim();
        user.active = tab[3].replace(regex, '').trim() == "true";
        user.phone = tab[4].replace(regex, '').trim();
        user.email = tab[5].replace(regex, '').trim();
        users.push(user)
      }
    });

    let grp = new Group() ;
    grp.group_id = this.data ;
    this.users = users;
    this.users.map(
      user =>  user.grp = grp
    );

    this.dataSource = new MatTableDataSource<User>(this.users);

  }


  onFileSelect(input: any) {
    const files = input.files;
    var content = this.csvContent;
    if (files && files.length) {
      const fileToLoad = files[0];
      console.log(fileToLoad);
      const fileReader = new FileReader();
      fileReader.readAsText(fileToLoad, "UTF-8");
      fileReader.onload = this.onFileLoad.bind(this);
    }
  }

  addUsers(){
    this.spinnerService.activate() ;
    this.userService.postUsers(this.users).subscribe(
      res => {
        this.notificationService.openSnackBar('Users list Added successfully' , 'green-snackbar');
        this.spinnerService.deactivate() ;
      },err=>{
        console.log(err) ;
        this.notificationService.openSnackBar('Error when adding users' , 'red-snackbar') ;
        this.spinnerService.deactivate()
      }
    )
  }

  resolve(){
    if(this.users == null ){
      return null;
    }
    else if(this.users.length == 0 ){
      return 'nousers' ;
    }
    return 'users'
  }

}
