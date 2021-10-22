import { BoardStatus } from '../boards/board-status.enum';
import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Entity,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  @ManyToOne((type) => User, (user) => user.boards, { eager: true })
  user: User;
}
