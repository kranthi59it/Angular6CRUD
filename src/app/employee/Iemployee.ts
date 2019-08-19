import {Iskill} from './Iskill';
import { from } from 'rxjs';

export interface Iemployee{
    id : number;
    fullname :  string;
      email :  string;
      Salary : number;
      Age : number;
      skills : Iskill[];
}