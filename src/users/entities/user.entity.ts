import { Base } from '../../shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends Base {
  @Column()
  email: string;

  @Column()
  isActive: boolean;
}
