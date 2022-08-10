import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const url = 'https://owrvd3fj55.execute-api.us-east-1.amazonaws.com/v2/results';

@Injectable({
  providedIn: 'root',
})
export class AwsService {
  constructor(private http: HttpClient) {}

  getSavedShadows(): Observable<any> {
    return this.http
      .get<any>(url, httpOptions)
      .pipe(
        map((res) =>
          res.Items.sort((a: any, b: any) => a.timestamp - b.timestamp)
        )
      );
  }

  getFromDates(dateFrom: Date, dateTo: Date) {
    return this.getSavedShadows().pipe(
      map((res) =>
        res.filter(
          //@ts-ignore
          (val) =>
            new Date(val.timestamp) >= dateFrom &&
            new Date(val.timestamp) <= dateTo
        )
      )
    );
  }

  getPropertyValues(property: string): Observable<any[]> {
    return this.getSavedShadows().pipe(
      //@ts-ignore
      map((data) => data.map((x) => x[property]))
    );
  }
}
