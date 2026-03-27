import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/aggregates/user/user';
import { type IUserRepository } from 'src/domain/repositories';

export interface IGetUsersUseCase {
  execute(): Promise<User[]>;
}

@Injectable()
export class GetUsersUseCase implements IGetUsersUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.getAll();
  }
}
