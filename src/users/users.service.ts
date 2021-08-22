import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { User } from './entities/user.entity';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRespository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRespository.find();
  }
  async findUserByEmail(email: string): Promise<User> {
    const users = await this.usersRespository.find({
      where: { email },
      relations: ['profile'],
    });

    return users[0];
  }
  findUserById(id: string): Promise<User> {
    return this.usersRespository.findOne(id, {
      relations: ['profile'],
    });
  }
  create(userDto: UserDto): Promise<User> {
    const user = new User();
    user.email = userDto.email;
    user.isActive = true;
    const profile = new UserProfile();
    profile.firstName = userDto.firstName ?? null;
    profile.lastName = userDto.lastName ?? null;

    user.profile = profile;

    return this.usersRespository.save(user);
  }
}
