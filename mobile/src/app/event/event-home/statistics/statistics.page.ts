import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  constructor(private modalCtrl : ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss().then((res) => console.log(res)).catch((err) => console.log(err));
  }

}
