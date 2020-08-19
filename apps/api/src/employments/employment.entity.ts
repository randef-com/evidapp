import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {Job} from "../jobs/job.entity";
import {Company} from "../companies/company.entity";
import {Employee} from "../employees/employee.entity";

@Entity()
export class Employment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  workload: number;

  @Column("time")
  shiftStart: Date;

  @Column("time")
  shiftEnd: Date;

  @Column("time")
  breakStart: Date;

  @Column("time")
  breakEnd: Date;

  @ManyToOne(type => Employee, employee => employee.employments, { eager: false })
  employee: Employee;

  @ManyToOne(type => Job, job => job.employments, { eager: true })
  job: Job;

  @ManyToOne(type => Company, company => company.employments, { eager: true })
  company: Company;
}
