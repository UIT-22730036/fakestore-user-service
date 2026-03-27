import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/module';
import { CreateUserUseCase } from './user/create-user.usecase';

@Module({
  imports: [InfrastructureModule],
  providers: [
    {
      provide: 'CREATE_USER_USE_CASE',
      useClass: CreateUserUseCase,
    },
  ],
  exports: ['CREATE_USER_USE_CASE'],
})
export class UseCaseModule {}
