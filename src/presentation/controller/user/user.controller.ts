import { Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUsersResponse,
  UserServiceController,
  UserServiceControllerMethods,
} from 'src/infrastructure/grpc/protobuf/user';
import type { ICreateUserUseCase, IGetUsersUseCase } from 'src/usecase/user';

@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(
    @Inject('CREATE_USER_USE_CASE')
    private readonly createUserUseCase: ICreateUserUseCase,
    @Inject('GET_USERS_USE_CASE')
    private readonly getUsersUseCase: IGetUsersUseCase,
  ) {}
  createUser(
    request: CreateUserRequest,
  ):
    | Promise<CreateUserResponse>
    | Observable<CreateUserResponse>
    | CreateUserResponse {
    const { email, password, avatar } = request;

    return this.createUserUseCase
      .execute(email, password, avatar)
      .then(() => {
        return { response: 'ok' };
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        return { response: 'error' };
      });
  }

  getUsers(): Promise<GetUsersResponse> {
    return this.getUsersUseCase
      .execute()
      .then((users) => {
        return { users };
      })
      .catch((error) => {
        console.error('Error getting users:', error);
        return { users: [] };
      });
  }
}
