import { BadRequestException } from '@nestjs/common';

export class NotFoundException extends BadRequestException {
  constructor() {
    super('not_found');
  }
}
