import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from 'src/entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  // getAllBoards(): Board[] {
  //   // return 값의 타입 지정
  //   return this.boards;
  // }

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;
  //   //const title = createBoardDto.title; 이것과 동일하다.
  //   const board: Board = {
  //     id: uuid(),
  //     title, // title:title을 이렇게 생략해줄수 있다.
  //     description,
  //     status: BoardStatus.PUBLIC, // 기본값을 PUBLIC으로 설정하기
  //   };
  //   this.boards.push(board);
  //   return board;
  // }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Can't find Board with id ${id}`);
  //   }
  //   return found;
  // }

  deleteBoard(id: number): Promise<void> {
    return this.boardRepository.deleteBoard(id);
  }

  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);
    // const update = this.boardRepository.update({ id }, { status });

    return board;
  }

  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
