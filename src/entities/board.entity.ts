import { BoardStatus } from './../boards/board.model';
import { PrimaryGeneratedColumn, Column, BaseEntity, Entity } from 'typeorm';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titile: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;
}
