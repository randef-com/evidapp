import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {Employment} from "../employments/employment.entity";

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Employment, employment => employment.employee, { eager: false })
  employments: Employment[];

}
