import { BaseEntity } from '../../common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('cars')
export class Car extends BaseEntity {
  @Column()
  model: string;

  @Column({
    default: null,
  })
  note: string;
}
