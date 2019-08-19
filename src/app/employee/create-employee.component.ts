import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms'
import { ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from '../employee.service';
import{Iemployee} from './Iemployee';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
employeeform : FormGroup;
skills:FormGroup;
employee : Iemployee;
pageTitle : string;
  constructor(private fb :FormBuilder,private route:ActivatedRoute,private empservice:EmployeeService,
    private router : Router) { }

  ngOnInit() {
    this.employeeform =this.fb.group({
      fullname : ['',Validators.required]
    })
    this.employeeform = new FormGroup({
      fullname :  new FormControl(),
      email :  new FormControl(),
      Salary :  new FormControl(),
      Age : new FormControl(),
      skills : new FormGroup  ({
        skillName : new FormControl(),
        experienceInYears : new FormControl(),
        Proficiency : new FormControl()
      })

    });

    this.route.paramMap.subscribe(parms=> {
      const empId = +parms.get('id');
      if(empId){
        this.pageTitle='Edit Employee';
        this.getemployee(empId);
      } else  {
        this.pageTitle='Create Employee';

        this.employee={
          id:null,
          fullname : '',
          email :'',
          Salary : null,
          Age :null,
          skills :[]  
        };
      }
    })
  }
  getemployee(id:number) {
this.empservice.getemployee(id).subscribe(
 (employee : Iemployee)=> {this.editEmployee(employee)
  this.employee=employee;

},
 (err:any) =>console.log(err)
);
  }
  editEmployee(employee :  Iemployee){
    this.employeeform.patchValue ({
      fullname : employee.fullname,
      email : employee.email,
Salary : employee.Salary,
Age : employee.Age
    })
  }
  onLoadDataClick() : void
  {
    this.employeeform.setValue({
      fullname : 'Siva',
      email : 'siva@gmail.com',
      skills :{
        skillName : '.NET',
        experienceInYears : 8,
        Proficiency : 'beginner '
      }
    })
  }
  onSubmit()  : void{
    this.mapFormValuesToEmployeeModel();

  if (this.employee.id) {
    this.empservice.updateEmployee(this.employee).subscribe(
      () => this.router.navigate(['list']),
      (err: any) => console.log(err)
    );
  } else {
    this.empservice.addEmployee(this.employee).subscribe(
      () => this.router.navigate(['list']),
      (err: any) => console.log(err)
    );
  }
}

mapFormValuesToEmployeeModel(){
  this.employee.fullname =this.employeeform.value.fullname;
  this.employee.email =this.employeeform.value.email;
  this.employee.Salary =this.employeeform.value.Salary;
  this.employee.Age =this.employeeform.value.Age;
}

}
