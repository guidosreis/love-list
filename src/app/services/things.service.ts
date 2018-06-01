import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Thing } from '../thing-section/thing.model';

@Injectable({
  providedIn: 'root'
})
export class ThingsService {

  constructor(private http: HttpClient) { }

  getThings(): Observable<Thing[]> {
    return this.http.get<Thing[]>('assets/things.json');
  }
}
