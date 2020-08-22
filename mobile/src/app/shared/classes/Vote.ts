import {VoteOption} from './VoteOption';

export class Vote {
    vote_id: number;
    title: string;
    description: string;
    event : any ;
    response_list : any ;
    options_list: VoteOption [];
}
