import { User } from './User';
import { Event } from './Event'

export class Invitation {
    invitation_id : number ;
    grp: string ;
    status : any ;
    user: User ;
    event : Event ;
}
