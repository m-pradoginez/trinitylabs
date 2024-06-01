import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './Customer';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  url = 'https://localhost:5001/api/customer';

  constructor(private http: HttpClient) {}

  GetAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url);
  }

  GetById(id: number): Observable<Customer> {
    const apiUrl = `${this.url}/${id}`;
    return this.http.get<Customer>(apiUrl);
  }

  PostCustomer(customer: Customer): Observable<any> {
    return this.http.post<Customer>(this.url, customer, httpOptions);
  }

  PutCustomer(customer: Customer): Observable<any> {
    return this.http.put<Customer>(this.url, customer, httpOptions);
  }

  DeleteCustomer(id: number): Observable<any> {
    const apiUrl = `${this.url}/${id}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
