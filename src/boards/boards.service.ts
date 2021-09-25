import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = []; // boards가 배열이기 때문에 Board도 []를 붙여서 배열로 만들어준다.

  getAllBoards(): Board[] {
    // return 값의 타입 지정
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    //const title = createBoardDto.title; 이것과 동일하다.
    const board: Board = {
      id: uuid(),
      title, // title:title을 이렇게 생략해줄수 있다.
      description,
      status: BoardStatus.PUBLIC, // 기본값을 PUBLIC으로 설정하기
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }

  deleteBoard(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);
  }
}
