import { Component, OnInit, Output } from '@angular/core';
import {EmployeeService} from '../employee.service';
import {Iemployee} from './Iemployee';
import { Router} from '@angular/router';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
employees:Iemployee[];
employee : Iemployee;
//@Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  constructor(private _empservice :  EmployeeService, private _router:Router) { }

  ngOnInit() {

    this._empservice.Getemployee().subscribe(   
      (listemployee: Iemployee[]) => this.employees=listemployee,        
      (err) =>console.log(err)
    );
  }
  editButtonClick(employeeId :number){
    this._router.navigate(['/edit', employeeId ]);
  }

  deleteEmployee(employeeId :number) {
    this._empservice.deleteEmployee(employeeId).subscribe(
      () => console.log(`Employee with ID = ${employeeId} Deleted`),
      (err) => console.log(err)
    );
    //this.notifyDelete.emit(this.employee.id);
  }
}
