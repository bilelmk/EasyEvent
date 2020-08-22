import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CreateEventService } from '../interne/create-event.service';
import {NotificationService} from '../interne/notification.service';

@Injectable({
    providedIn: 'root'
})
export class CreateEventGuard implements CanActivate {

    constructor(private createEventService: CreateEventService , private router: Router , private notificationService : NotificationService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const event = this.createEventService.getMyEvent();

        if (!event) {
          this.notificationService.openSnackBar("Put the event description first" , "red-snackbar")
            this.router.navigate(['/main/create_event/create-event-decription']);

        }
        return true;
    }

}
