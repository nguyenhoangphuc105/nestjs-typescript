import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class GetCarDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  limit: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  offset: number;
}
