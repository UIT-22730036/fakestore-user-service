import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/module';
import { CreateUserUseCase, GetUsersUseCase } from './user';

@Module({
  imports: [InfrastructureModule],
  providers: [
    {
      provide: 'CREATE_USER_USE_CASE',
      useClass: CreateUserUseCase,
    },
    {
      provide: 'GET_USERS_USE_CASE',
      useClass: GetUsersUseCase,
    },
  ],
  exports: ['CREATE_USER_USE_CASE', 'GET_USERS_USE_CASE'],
})
export class UseCaseModule {}
