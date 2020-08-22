import {Address} from './Address';

export class User {
    user_id:number;
    active : boolean ;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    roles : string ;
    password : string ;
    username : string ;
    image : any ;
    address : Address ;
}
