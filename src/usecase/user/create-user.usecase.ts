import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { type IUserRepository } from 'src/domain/repositories';
import { hashPassword } from 'src/infrastructure/bcrypt/bcrypt';

export interface ICreateUserUseCase {
  execute(email: string, password: string, avatar?: string): Promise<void>;
}

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(
    email: string,
    password: string,
    avatar?: string,
  ): Promise<void> {
    try {
      const hashedPassword = await hashPassword(password);
      await this.userRepository.create(email, hashedPassword, avatar);
    } catch (error) {
      Logger.error(error, 'Failed to create user');
      throw new InternalServerErrorException('Failed to create user');
    }
  }
}
