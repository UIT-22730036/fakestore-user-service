import { Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  CreateUserRequest,
  CreateUserResponse,
  UserServiceController,
  UserServiceControllerMethods,
} from 'src/infrastructure/grpc/protobuf/user';
import { type ICreateUserUseCase } from 'src/usecase/user/create-user.usecase';

@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(
    @Inject('CREATE_USER_USE_CASE')
    private readonly createUserUseCase: ICreateUserUseCase,
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
}
