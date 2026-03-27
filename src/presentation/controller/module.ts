import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check/health-check.controller';
import { UserController } from './user/user.controller';
import { UseCaseModule } from 'src/usecase/module';

@Module({
  imports: [UseCaseModule],
  controllers: [HealthCheckController, UserController],
})
export class ControllerModule {}
