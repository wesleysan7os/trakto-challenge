import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Credentials } from '../models/login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly baseUrl = 'https://api.trakto.io';
  constructor(private http: HttpClient) {}

  login(credentials: Credentials): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/auth/signin`, credentials);
  }
}
