import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/http/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  events: string[] = [];
  opened: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.toggleMenu() ;
  }

  constructor(private authService : AuthService) {}

  ngOnInit() {
    this.toggleMenu() ;
  }

  toggleMenu(){
    this.opened = window.innerWidth > 990;
  }

  logout() {
    this.authService.logout()
  }
}
