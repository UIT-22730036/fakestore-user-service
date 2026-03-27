import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from 'src/domain/repositories';
import { UserEntity } from '../entity';
import { Repository } from 'typeorm';
import { User } from 'src/domain/aggregates/user/user';
import { convertDateToYYYYMMDDHHMMSS } from 'src/infrastructure/common/utils';

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

  async getAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users.map((user) =>
      User.create(
        user.id,
        user.email,
        user.password,
        user.avatar,
        convertDateToYYYYMMDDHHMMSS(user.createdAt),
        convertDateToYYYYMMDDHHMMSS(user.updatedAt),
        convertDateToYYYYMMDDHHMMSS(user.deletedAt),
      ),
    );
  }
}
