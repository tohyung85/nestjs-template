import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRespository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRespository.find();
  }
  testAdd(): Promise<User> {
    const user = new User();
    user.email = 'testing@gmail.com';
    user.isActive = true;
    return this.usersRespository.save(user);
  }
}
