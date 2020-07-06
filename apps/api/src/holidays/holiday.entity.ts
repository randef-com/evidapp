import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Holiday {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("date")
  date: Date;
}
