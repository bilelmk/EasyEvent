import {Component, HostListener, OnInit} from '@angular/core';
import {Event} from '../../../shared/classes/Event';
import {ExistEventService} from '../../../shared/services/interne/exist-event.service';

@Component({
  selector: 'app-event-sidebar',
  templateUrl: './event-sidebar.component.html',
  styleUrls: ['./event-sidebar.component.scss']
})
export class EventSidebarComponent implements OnInit {

  opened: boolean;
  existEvent: Event;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.toggleMenu();
  }

  constructor(private existEventService : ExistEventService) {}

  ngOnInit() {
    this.existEvent = this.existEventService.getExistEvent();
    this.toggleMenu();
  }

  toggleMenu() {
    this.opened = window.innerWidth > 990;
  }
}
