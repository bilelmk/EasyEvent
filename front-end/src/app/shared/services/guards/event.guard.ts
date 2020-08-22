import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ExistEventService } from '../interne/exist-event.service';

@Injectable({
    providedIn: 'root'
})
export class EventGuard implements CanActivate {

    constructor(private existEventService: ExistEventService , private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const eventExist = this.existEventService.getExistEvent();

        if (!eventExist) {
            this.router.navigate(['/main/events']);
        }
        return true;
    }

}
