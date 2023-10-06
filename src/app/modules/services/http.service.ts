/* eslint-disable @typescript-eslint/naming-convention */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  SERVER_URL = environment.url+'api';

  options = {
    headers : {
      'Content-Type': 'application/json'
    },
  };

  constructor(
    private http: HttpClient,
    ) {
  }

  ejectQuery<T>(url: string, query: Record<string, string> = {}, options = {}): Observable<T> {
    const queryString = new URLSearchParams(query).toString();

    return this.http.get<T>(`${this.SERVER_URL}${url}?${queryString}` , {
      ...this.options,
      ...options
    });
  };

  ejectPost<T>(url: string, data: any, options = {}) {
    return this.http.post(`${this.SERVER_URL}${url}`, data, {
      ...this.options,
      ...options
    });
  };

  ejectPatch<T>(url: string, data: any, options = {}) {
    return this.http.patch(`${this.SERVER_URL}${url}`, data, {
      ...this.options,
      ...options
    });
  };

}
