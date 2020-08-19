import {IEmployment} from "./employment/employment.interface";

export interface IEmployee
{
  id: number,
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  avatar?: string;
  status?: string;
  employments? : IEmployment[];
}

