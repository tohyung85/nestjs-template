import { Base } from '../../shared/entities/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserProfile } from './user-profile.entity';

@Entity()
export class User extends Base {
  @Column({ unique: true })
  email: string;

  @Column()
  isActive: boolean;

  @OneToOne(() => UserProfile, {
    cascade: true,
  })
  @JoinColumn()
  profile: UserProfile;
}
