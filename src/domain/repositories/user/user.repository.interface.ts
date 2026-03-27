import { User } from 'src/domain/aggregates/user/user';

export interface IUserRepository {
  create(email: string, password: string, avatar?: string): Promise<void>;
  getAll(): Promise<User[]>;
}
