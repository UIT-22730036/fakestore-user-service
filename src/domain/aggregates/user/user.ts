export class User {
  id: number;
  email: string;
  password: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;

  constructor(
    id: number,
    email: string,
    password: string,
    avatar: string | undefined,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | undefined,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static create(
    id: number,
    email: string,
    password: string,
    avatar: string | undefined,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | undefined,
  ): User {
    return new User(
      id,
      email,
      password,
      avatar,
      createdAt,
      updatedAt,
      deletedAt,
    );
  }
}
