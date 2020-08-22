import {EventDay} from './EventDay';

export class Event {
    event_id : number ;
    description  : string ;
    name : string ;
    start_date : Date ;
    end_date : Date ;
    attendees_number : number ;
    day_list : EventDay[] ;
    image : any
}
