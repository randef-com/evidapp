import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

}
