import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SpinnerService } from '../../../../shared/services/interne/spinner.service';
import { NotificationService } from '../../../../shared/services/interne/notification.service';
import { VoteService } from '../../../../shared/services/http/vote.service';

@Component({
  selector: 'app-event-vote-result',
  templateUrl: './event-vote-result.component.html',
  styleUrls: ['./event-vote-result.component.scss']
})
export class EventVoteResultComponent implements OnInit {

  pieChartLabels = [];
  pieChartData = [];
  pieChartType = 'doughnut';

  constructor( private voteService : VoteService ,  @Inject(MAT_DIALOG_DATA) private data: any ,
               private spinnerService : SpinnerService , private notificationService : NotificationService) {}

  ngOnInit() {
    // this.spinnerService.activate() ;
    this.voteService.getVoteResult(this.data.vote_id).subscribe(
      res => {
        console.log(res)
        this.pieChartLabels = res.map( el => el.name) ;
        this.pieChartData = res.map( el => el.value) ;
        // this.spinnerService.deactivate() ;
      } ,
      err => {
        console.log(err);
        // this.spinnerService.deactivate() ;
      }
    )
  }

}
