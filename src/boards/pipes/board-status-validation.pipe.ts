import { PipeTransform, BadRequestException } from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status); // status에 StatusOptions에 없는 값이 들어오면 index는 -1을 반환한다.
    return index !== -1;
  }

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }

    return value;
  }
}
