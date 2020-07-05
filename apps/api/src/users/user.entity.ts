import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert, Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {Exclude} from "class-transformer";

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
