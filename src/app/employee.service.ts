import { Injectable } from '@angular/core';
import {observable, Observable, throwError} from 'rxjs';
import {Iemployee} from './employee/Iemployee';
import { from } from 'rxjs';
import{HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import{catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpclient: HttpClient) { }
  baseUrl: string = 'http://localhost:3000/employees/';

  Getemployee(): Observable<Iemployee[]>{
    return this.httpclient.get<Iemployee[]>(this.baseUrl).pipe(catchError(this.handleError));
  }   
  getemployee(id: number):Observable<Iemployee>{
    return this.httpclient.get<Iemployee>(`${this.baseUrl}/${id}`)
    .pipe(catchError(this.handleError));
  }
  addEmployee(employee : Iemployee): Observable<Iemployee>{
   return this.httpclient.post<Iemployee>(this.baseUrl, employee,{
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
    })
   })
    .pipe(catchError(this.handleError));
  }

  updateEmployee(employee : Iemployee) :Observable<void>{
    return this.httpclient.put<void>(`${this.baseUrl}/${employee.id}`,employee,{
      headers : new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }).pipe(catchError(this.handleError));}
  deleteEmployee(id: number): Observable<void> {
    return this.httpclient.delete<void>(`${this.baseUrl}/${id}`)
        .pipe(catchError(this.handleError));
}
  private handleError(errorResponse : HttpErrorResponse){
    if(errorResponse.error instanceof ErrorEvent){
console.error('client side error : ' , errorResponse.error);

    }
    else {
      console.error('server side error' , errorResponse);
    } 
    return throwError('There is a problem with service');
  }
}
