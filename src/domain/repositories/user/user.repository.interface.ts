export interface IUserRepository {
  create(email: string, password: string, avatar?: string): Promise<void>;
}
