import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from 'src/domain/repositories';
import { UserEntity } from '../entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(
    email: string,
    password: string,
    avatar?: string,
  ): Promise<void> {
    const user = this.userRepository.create({
      email,
      password,
      avatar,
    });

    await this.userRepository.save(user);
  }
}
