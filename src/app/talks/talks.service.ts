import { Inject, Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/map';
import { FiltersType, TalkType } from './models';

@Injectable()
export class TalksService {

  constructor(@Inject('ApiUrl') private apiUrl: string,
              private http: Http) {
  }

  public findTalks(filters: FiltersType): Observable<{ talks: { [id: number]: TalkType }, list: number[] }> {
    const params = new URLSearchParams();
    params.set('speaker', filters.speaker);
    params.set('title', filters.title);
    params.set('minRating', filters.minRating.toString());
    return this.http.get(`${this.apiUrl}/talks`, { search: params })
      .map((response: Response) => response.json());
  }

  public findTalk(id: number): Observable<TalkType> {
    const params = new URLSearchParams();
    params.set('id', id.toString());
    return this.http.get(`${this.apiUrl}/talk/`, { search: params })
      .map((response: Response) => response.json()[ 'talk' ]);
  }

  public rateTalk(id: number, rating: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/rate`, { id, yourRating: rating });
  }
}
