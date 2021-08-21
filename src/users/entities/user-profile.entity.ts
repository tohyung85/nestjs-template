import { Base } from '../../shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserProfile extends Base {
  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
