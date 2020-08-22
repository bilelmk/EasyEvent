import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventHomePageRoutingModule } from './event-home-routing.module';
import { EventHomePage } from './event-home.page';
import { VotesPage } from './votes/votes.page';
import { SurveysPage } from './surveys/surveys.page';
import { RoomsPage } from './rooms/rooms.page';
import { GoodiesPage } from './goodies/goodies.page';
import { QrScannerPage } from './qr-scanner/qr-scanner.page';
import { StatisticsPage } from './statistics/statistics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventHomePageRoutingModule
  ],
  declarations: [EventHomePage , VotesPage , SurveysPage , RoomsPage, GoodiesPage , StatisticsPage , QrScannerPage],
  entryComponents : [VotesPage , SurveysPage , RoomsPage, GoodiesPage , QrScannerPage , StatisticsPage],
  providers :[]
})
export class EventHomePageModule {}
