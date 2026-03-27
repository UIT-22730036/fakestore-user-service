export class User {
  id: number;
  email: string;
  password: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(
    id: number,
    email: string,
    password: string,
    avatar: string | undefined,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | undefined,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
