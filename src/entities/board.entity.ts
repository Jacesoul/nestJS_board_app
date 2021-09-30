import { BoardStatus } from '../boards/board-status.enum';
import { PrimaryGeneratedColumn, Column, BaseEntity, Entity } from 'typeorm';

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
}
