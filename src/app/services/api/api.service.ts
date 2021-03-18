import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private OPTIONS = {
    API_URL: 'https://jsonplaceholder.typicode.com'
  };

  constructor(private http: HttpClient) { }

  getMethod(endPoint, prms?): Promise<any> {
    const params = this.setParams(prms);
    return this.http.get(`${this.OPTIONS.API_URL}/${endPoint}`, { params })
      .pipe(
        retry(2),
        catchError((error: HttpErrorResponse) => {
          let data = {};
          data = {
            reason: error && error.error.reason ? error.error.reason : '',
            status: error.status
          };
          return throwError(error);
        })
      ).toPromise();
  }

  setParams(prms): HttpParams {
    let params = new HttpParams();
    if (prms) {
      const keyParams = Object.keys(prms);
      for (const p of keyParams) {
        params = params.append(p, prms[p]);
      }
    }
    return params;
  }

}
