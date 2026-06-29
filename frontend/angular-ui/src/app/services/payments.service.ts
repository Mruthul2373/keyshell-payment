import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private apiUrl =
    'http://127.0.0.1:8000/api/payments';

  constructor(private http: HttpClient) {}

  getPayments() {
    return this.http.get<any[]>(this.apiUrl);
  }

}