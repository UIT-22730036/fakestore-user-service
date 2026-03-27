import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:50051',
        package: ['grpc.health.v1', 'user.v1'],
        protoPath: [
          join(__dirname, 'infrastructure/grpc/protobuf/health-check.proto'),
          join(__dirname, 'infrastructure/grpc/protobuf/user.proto'),
        ],
      },
    },
  );

  await app.listen();
  Logger.log('Server is listening on localhost:50051');
}
bootstrap();
