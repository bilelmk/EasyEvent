import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../../classes/Survey';
import { baseURL } from '../../baseurl'

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) { }

    getSurveysByEventId(id : number): Observable<Survey[]> {
        return this.http.get<Survey[]>(baseURL + "event-service/surveys/event/" +id );
    }

    getSurveysResult(id : number): Observable<any> {
        return this.http.get<any>(baseURL + "event-service/surveys/result/" +id );
    }

    deleteSurvey(id: number) {
        return this.http.delete(baseURL + "event-service/surveys/" + id);
    }

    postSurvey(survey : Survey): Observable<Survey> {
        return this.http.post<Survey>(baseURL + "event-service/surveys" , survey);
    }

    putSurvey(survey : Survey) {
        return this.http.put(baseURL + "event-service/surveys" , survey);
    }

}
