import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vote } from '../../classes/Vote';
import { baseURL } from '../../baseurl';
import { VoteOption } from '../../classes/VoteOption';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

    constructor(private http: HttpClient) { }

    getVotesByEventId(id : number): Observable<Vote[]> {
        return this.http.get<Vote[]>(baseURL + "event-service/votes/event/" +id  );
    }

    getVoteResult(id : number): Observable<any> {
        return this.http.get<any>(baseURL + "event-service/votes/result/" +id  );
    }

    deleteVote(id: number) {
        return this.http.delete(baseURL + "event-service/votes/" + id);
    }

    deleteVoteOption(id: number) {
      return this.http.delete(baseURL + "event-service/vote-options/" + id);
    }


    postVote(vote : any): Observable<Vote> {
        return this.http.post<Vote>(baseURL + "event-service/votes" , vote) ;
    }

    posteVoteOption(id : number , option : VoteOption) : Observable<Vote> {
      return this.http.post<Vote>(baseURL + "event-service/votes/" +id  , option) ;
    }

    putVote(vote : Vote) {
        return this.http.put(baseURL + "event-service/votes" , vote) ;
    }


}
