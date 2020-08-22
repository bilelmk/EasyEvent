import { Component, OnInit } from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {Group} from '../shared/classes/Group';
import {SpinnerService} from '../shared/services/interne/spinner.service';
import {GroupService} from '../shared/services/http/group.service';
import {GroupAddComponent} from './group-add/group-add.component';
import {GroupDeleteComponent} from './group-delete/group-delete.component';
import {GroupUpdateComponent} from './group-update/group-update.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  groups : Group[] = [] ;
  public dataSource = new MatTableDataSource<Group>();
  displayedColumns = ['name' , 'description' , 'action' ];


  constructor(private spinnerService : SpinnerService , private groupService : GroupService , public dialog: MatDialog ) { }

  ngOnInit() {
    this.spinnerService.activate();
    this.groupService.getGroups().subscribe(
      res => {
        this.groups = res ;
        this.dataSource.data = this.groups ;
        this.spinnerService.deactivate()
      },
      err => {
        console.log(err) ;
        this.spinnerService.deactivate()
      }
    )
  }

  openGroupAddDialog() {
    const dialogRef = this.dialog.open( GroupAddComponent, {
      panelClass: 'custom-dialog-container' , width: '800px', height: '600px'
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if (res){
          let new_tab =  this.dataSource.data ;
          new_tab.push(res) ;
          this.dataSource.data = new_tab;
        }
      })
  }

  openGroupDeleteDialog(groupe_id: any) {
    const dialogRef = this.dialog.open( GroupDeleteComponent, {
      panelClass: 'custom-dialog-container' , width: '800px', height: '400px' , data : groupe_id
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if (res){
          let new_tab =  this.dataSource.data ;
          new_tab.splice(new_tab.findIndex(group => {
            return group.group_id == groupe_id
          }) , 1);
          this.dataSource.data = new_tab;
        }
      })
  }

  openGroupUpdateDialog( group : Group ) {
    const dialogRef = this.dialog.open( GroupUpdateComponent, {
      panelClass: 'custom-dialog-container' , width: '800px', height: '600px', data : group
    });
  }
}
