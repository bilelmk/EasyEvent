import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-create-event-sidebar',
  templateUrl: './create-event-sidebar.component.html',
  styleUrls: ['./create-event-sidebar.component.scss']
})
export class CreateEventSidebarComponent implements OnInit {

  opened: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.toggleMenu();
  }

  constructor() {
  }

  ngOnInit() {
    this.toggleMenu();
  }

  toggleMenu() {
    this.opened = window.innerWidth > 990;
  }
}
