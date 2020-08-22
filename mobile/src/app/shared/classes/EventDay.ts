import {Session} from './Session';

export class EventDay {
    day_id : number ;
    day: Date ;
    start_activity: string ;
    end_activity: string  ;
    sessions_list: Session[] ;
}
