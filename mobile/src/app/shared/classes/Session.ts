import {SubSession} from './SubSession';

export class Session {
    session_id : number ;
    title: string ;
    description: string ;
    start_time: Date ;
    end_time: Date ;
    subSessions_list: SubSession[] ;
}
