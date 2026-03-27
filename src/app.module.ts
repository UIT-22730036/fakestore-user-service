import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/module';
import { PresentationModule } from './presentation/module';
import { UseCaseModule } from './usecase/module';

@Module({
  imports: [PresentationModule, UseCaseModule, InfrastructureModule],
})
export class AppModule {}
