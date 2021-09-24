import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardsService {
  private boards: Board[] = []; // boards가 배열이기 때문에 Board도 []를 붙여서 배열로 만들어준다.

  getAllBoards(): Board[] {
    // return 값의 타입 지정
    return this.boards;
  }
}
