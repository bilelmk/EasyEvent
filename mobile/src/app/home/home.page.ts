import { Component, OnInit } from '@angular/core';
import { Event } from '../shared/classes/event'
import { MenuController } from '@ionic/angular';
import { AuthService } from '../shared/services/http/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  events : Event[] = null ;

  constructor( private menuController : MenuController , private authService : AuthService ) {}

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout() ;
  }
}
