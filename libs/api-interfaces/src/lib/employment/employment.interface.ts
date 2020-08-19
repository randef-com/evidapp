import {ICompany} from "./company.interface";
import {IJob} from "./job.interface";

export interface IEmployment
{
  id: number;
  job: IJob;
  company: ICompany;
  workload: number;
  shiftStart: Date;
  shiftEnd: Date;
  breakStart: Date;
  breakEnd: Date;
}
