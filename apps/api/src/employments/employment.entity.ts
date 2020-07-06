import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {User} from "../users/user.entity";
import {Job} from "../jobs/job.entity";
import {Company} from "../companies/company.entity";

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

  @ManyToOne(type => User, user => user.employments, { eager: true })
  user: User;

  @ManyToOne(type => Job, job => job.employments, { eager: true })
  job: Job;

  @ManyToOne(type => Company, company => company.employments, { eager: true })
  company: Company;
}
