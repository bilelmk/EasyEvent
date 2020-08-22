import { EventDay } from './EventDay';
import { Coordinate } from './Coordinate';

export class Event {
    event_id : number ;
    description  : string ;
    name : string ;
    start_date : Date ;
    end_date : Date ;
    attendees_number : number ;
    coordinate : Coordinate ;
    image : any ;
    day_list : EventDay[]
}
