import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert, Unique, OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {Exclude} from "class-transformer";
import {Employment} from "../employments/employment.entity";

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column("simple-array", {default: 'user'})
  roles: string[];

  @OneToMany(type => Employment, employment => employment.user, { eager: false })
  employments: Employment[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
