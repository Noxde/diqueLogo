import { Injectable } from '@angular/core';
import {
  IoTDataPlaneClient,
  GetThingShadowCommand,
  GetThingShadowCommandOutput,
} from '@aws-sdk/client-iot-data-plane';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const url = 'API_URL';

@Injectable({
  providedIn: 'root',
})
export class AwsService {
  private client: IoTDataPlaneClient = new IoTDataPlaneClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: environment.accessKeyId,
      secretAccessKey: environment.secretAccessKey,
    },
  });

  constructor(private http: HttpClient) {}

  getSavedShadows(): Observable<any> {
    return this.http.get<any>(url, httpOptions).pipe(map((res) => res.Items));
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
