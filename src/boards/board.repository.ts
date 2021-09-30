import { EntityRepository, Repository } from 'typeorm';
import { Board } from 'src/entities/board.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {}
